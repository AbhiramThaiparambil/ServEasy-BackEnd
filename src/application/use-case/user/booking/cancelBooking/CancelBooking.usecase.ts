import { inject, injectable } from "tsyringe";
import mongoose from "mongoose";
import { ServiceBookingRepository } from "../../../../../infrastructure/repositories/ServiceBookingRepository";
import { SocketService } from "../../../../../services/socket/SocketService";
import { ICancelBookingUseCase } from "./ICancelBooking.usecase";

@injectable()
export class CancelBookingUseCase implements ICancelBookingUseCase {
  constructor(
    @inject(ServiceBookingRepository)
    private serviceBookingRepository: ServiceBookingRepository,
    @inject(SocketService)
    private socketService: SocketService,
  ) {}

  async execute(bookingId: string, status: string, reason: string) {
    const id = new mongoose.Types.ObjectId(bookingId);

    const data = await this.serviceBookingRepository.cancelBooking(
      id,
      status,
      reason,
    );

    await this.serviceBookingRepository.addBookingHistory(
      id,
      "cancelled",
      `Cancelled: ${reason}`,
    );

    this.socketService.sendNotificationToUser(
      data?.userId + "",
      data?.userId + "",
      {
        type: "notification",
        targetRole:"USER",
        content: "Your booking has been cancelled",
        timestamp: new Date().toISOString(),
      },
    );

    return data;
  }
}
