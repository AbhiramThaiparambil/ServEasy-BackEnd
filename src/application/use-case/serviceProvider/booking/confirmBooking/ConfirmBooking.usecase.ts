import { inject, injectable } from "tsyringe";
import mongoose from "mongoose";
import { ServiceBookingRepository } from "../../../../../infrastructure/repositories/ServiceBookingRepository";
import { SocketService } from "../../../../../services/socket/SocketService";
import { ISystemNotification } from "../../../../../domain/entities/INotification";
import { formatDateTime } from "../../../../../utils/formatDateTime";
import { IConfirmBookingUseCase } from "./IConfirmBooking.usecase";
import { ConfirmBookingRequestDTO } from "../../../../dtos/serviceProvider/booking/confirmBooking/ConfirmBookingRequestDTO";
import { ConfirmBookingResponseDTO } from "../../../../dtos/serviceProvider/booking/confirmBooking/ConfirmBookingResponseDTO";

@injectable()
export class ConfirmBookingUseCase implements IConfirmBookingUseCase {
  constructor(
    @inject(ServiceBookingRepository)
    private serviceBookingRepository: ServiceBookingRepository,
    @inject(SocketService)
    private socketService: SocketService,
  ) {}

  async execute(data: ConfirmBookingRequestDTO): Promise<ConfirmBookingResponseDTO> {
    const bookingObjectId = new mongoose.Types.ObjectId(data.bookingId);
    const providerId = new mongoose.Types.ObjectId(data.serviceProviderId);

    const isConflicting =
      await this.serviceBookingRepository.isServiceTimeConflicting(
        providerId,
        data.estimatedServiceTime,
      );

    if (isConflicting) {
      throw new Error("Time slot already allocated");
    }

    const booking =
      await this.serviceBookingRepository.findBookedServiceById(
        bookingObjectId,
      );

    if (!booking) throw new Error("Booking not found");

    let notification: ISystemNotification;

    if (data.reschedule) {
      await this.serviceBookingRepository.rescheduleBooking(
        bookingObjectId,
        data.estimatedServiceTime,
      );

      await this.serviceBookingRepository.addBookingHistory(
        bookingObjectId,
        "rescheduled",
        `Rescheduled to ${formatDateTime(data.estimatedServiceTime)}`,
      );

      notification = {
        type: "notification",
        targetRole: "USER",
        content: `Your booking has been rescheduled to ${formatDateTime(
          data.estimatedServiceTime,
        )}`,
        timestamp: new Date().toISOString(),
      };

      this.socketService.sendNotificationToUser(
        booking.userId.toString(),
        booking.userId.toString(),
        notification,
      );

      return { success: true, message: "Booking rescheduled successfully" };
    }

    if (booking.serviceStatus === "confirmed") {
      throw new Error("Booking already confirmed");
    }

    await this.serviceBookingRepository.confirmBooking(
      bookingObjectId,
      data.status,
      data.estimatedServiceTime,
    );

    await this.serviceBookingRepository.addBookingHistory(
      bookingObjectId,
      "confirmed",
      `Booking confirmed for ${formatDateTime(data.estimatedServiceTime)}`,
    );

    notification = {
      type: "notification",
      targetRole: "USER",
      content: "Your booking has been confirmed!",
      timestamp: new Date().toISOString(),
    };

    this.socketService.sendNotificationToUser(
      booking.userId.toString(),
      booking.userId.toString(),
      notification,
    );

    return { success: true, message: "Booking confirmed successfully" };
  }
}
