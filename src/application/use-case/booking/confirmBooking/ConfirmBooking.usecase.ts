import { inject, injectable } from "tsyringe";
import mongoose from "mongoose";
import { ServiceBookingRepository } from "../../../../infrastructure/repositories/ServiceBookingRepository";
import { SocketService } from "../../../../services/socket/SocketService";
import { ISystemNotification } from "../../../../domain/entities/INotification";
import { formatDateTime } from "../../../../utils/formatDateTime";
import { IConfirmBookingUseCase } from "./IConfirmBooking.usecase";

@injectable()
export class ConfirmBookingUseCase implements IConfirmBookingUseCase {
  constructor(
    @inject(ServiceBookingRepository)
    private serviceBookingRepository: ServiceBookingRepository,
    @inject(SocketService)
    private socketService: SocketService,
  ) {}

  async execute(
    bookingId: string,
    status: string,
    estimatedServiceTime: string,
    serviceProviderId: string,
    reschedule: boolean,
    rescheduleReason?: string,
  ) {
    const bookingObjectId = new mongoose.Types.ObjectId(bookingId);
    const providerId = new mongoose.Types.ObjectId(serviceProviderId);

    const isConflicting =
      await this.serviceBookingRepository.isServiceTimeConflicting(
        providerId,
        estimatedServiceTime,
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

    if (reschedule) {
      await this.serviceBookingRepository.rescheduleBooking(
        bookingObjectId,
        estimatedServiceTime,
      );

      await this.serviceBookingRepository.addBookingHistory(
        bookingObjectId,
        "rescheduled",
        `Rescheduled to ${formatDateTime(estimatedServiceTime)}`,
      );

      notification = {
        type: "notification",
        targetRole: "USER",
        content: `Your booking has been rescheduled to ${formatDateTime(
          estimatedServiceTime,
        )}`,
        timestamp: new Date().toISOString(),
      };

      this.socketService.sendNotificationToUser(
        booking.userId.toString(),
        booking.userId.toString(),
        notification,
      );

      return { success: true };
    }

    if (booking.serviceStatus === "confirmed") {
      throw new Error("Booking already confirmed");
    }

    const data = await this.serviceBookingRepository.confirmBooking(
      bookingObjectId,
      status,
      estimatedServiceTime,
    );

    await this.serviceBookingRepository.addBookingHistory(
      bookingObjectId,
      "confirmed",
      `Booking confirmed for ${formatDateTime(estimatedServiceTime)}`,
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

    return data;
  }
}
