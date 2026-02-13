import { inject, injectable } from "tsyringe";
import mongoose from "mongoose";
import { SocketService } from "../../../../../services/socket/SocketService";
import { ISystemNotification } from "../../../../../domain/entities/INotification";
import { IUpdateBookingStatusUseCase } from "./IUpdateBookingStatusUseCase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IServiceBookingRepository } from "../../../../../domain/repositories/IserviceBookingRepository";
import { UpdateBookingStatusRequestDTO } from "../../../../dtos/serviceProvider/booking/updateBookingStatus/UpdateBookingStatusRequestDTO";
import { IServiceBooking } from "../../../../../domain/entities/IServiceBooking";

@injectable()
export class UpdateBookingStatusUseCase implements IUpdateBookingStatusUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceBookingRepository)
    private serviceBookingRepository: IServiceBookingRepository,
    @inject(SocketService)
    private socketService: SocketService,
  ) {}

  async execute(data: UpdateBookingStatusRequestDTO):Promise<IServiceBooking|null> {
    const id = new mongoose.Types.ObjectId(data.bookingId);

    const result = await this.serviceBookingRepository.updateServiceStatus(
      id,
      data.status,
    );

    await this.serviceBookingRepository.addBookingHistory(
      id,
      "status-updated",
      `Booking status updated to ${data.status}`,
    );

    const notification: ISystemNotification = {
      type: "notification",
      targetRole:"USER",
      content: result?.isOnlineService
        ? "Your service has been confirmed. Please complete payment."
        : `Your booking status has been updated to ${data.status}`,
      timestamp: new Date().toISOString(),
    };

    this.socketService.sendNotificationToUser(
      result?.userId + "",
      result?.userId + "",
      notification,
    );

    this.socketService.refreshData(result?.userId + "");

    return result;
  }
}
