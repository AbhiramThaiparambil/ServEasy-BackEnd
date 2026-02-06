import { inject, injectable } from "tsyringe";
import mongoose from "mongoose";
import { ServiceBookingRepository } from "../../../../../infrastructure/repositories/ServiceBookingRepository";
import { SocketService } from "../../../../../services/socket/SocketService";
import {
  CancelBookingRequestDTO,
  CancelBookingResponseDTO,
} from "../../../../../application/dtos/user/booking/cancelBooking/CancelBookingDTO";
import { IServiceBooking } from "../../../../../domain/entities/IServiceBooking";
import { ICancelBookingUseCase } from "./ICancelBooking.usecase";

@injectable()
export class CancelBookingUseCase implements ICancelBookingUseCase {
  constructor(
    @inject(ServiceBookingRepository)
    private serviceBookingRepository: ServiceBookingRepository,
    @inject(SocketService)
    private socketService: SocketService,
  ) {}

  async execute(data: CancelBookingRequestDTO): Promise<IServiceBooking | null> {
    const { bookingId, status, reason } = data;
    const id = new mongoose.Types.ObjectId(bookingId);

    const cancelledBooking = await this.serviceBookingRepository.cancelBooking(
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
      cancelledBooking?.userId + "",
      cancelledBooking?.userId + "",
      {
        type: "notification",
        targetRole:"USER",
        content: "Your booking has been cancelled",
        timestamp: new Date().toISOString(),
      },
    );

    return cancelledBooking;
  }
}
