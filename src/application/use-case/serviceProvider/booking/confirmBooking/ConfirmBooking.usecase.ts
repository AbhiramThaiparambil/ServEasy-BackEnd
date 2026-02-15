import { inject, injectable } from "tsyringe";
import { IServiceBookingRepository } from "../../../../../domain/repositories/IserviceBookingRepository";
import { SocketService } from "../../../../../services/socket/SocketService";
import { ISystemNotification } from "../../../../../domain/entities/INotification";
import { formatDateTime } from "../../../../../utils/formatDateTime";
import { IConfirmBookingUseCase } from "./IConfirmBooking.usecase";
import { ConfirmBookingRequestDTO } from "../../../../dtos/serviceProvider/booking/confirmBooking/ConfirmBookingRequestDTO";
import { ConfirmBookingResponseDTO } from "../../../../dtos/serviceProvider/booking/confirmBooking/ConfirmBookingResponseDTO";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";

@injectable()
export class ConfirmBookingUseCase implements IConfirmBookingUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceBookingRepository)
    private serviceBookingRepository: IServiceBookingRepository,
    @inject(SocketService)
    private socketService: SocketService,
  ) {}

  async execute(data: ConfirmBookingRequestDTO): Promise<ConfirmBookingResponseDTO> {
    const isConflicting =
      await this.serviceBookingRepository.isServiceTimeConflicting(
        data.serviceProviderId,
        data.estimatedServiceTime,
      );

    if (isConflicting) {
      throw new Error("Time slot already allocated");
    }

    const booking =
      await this.serviceBookingRepository.findBookedServiceById(
        data.bookingId,
      );

    if (!booking) throw new Error("Booking not found");

    let notification: ISystemNotification;

    if (data.reschedule) {
      await this.serviceBookingRepository.rescheduleBooking(
        data.bookingId,
        data.estimatedServiceTime,
      );

      await this.serviceBookingRepository.addBookingHistory(
        data.bookingId,
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
      data.bookingId,
      data.status,
      data.estimatedServiceTime,
    );

    await this.serviceBookingRepository.addBookingHistory(
      data.bookingId,
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
