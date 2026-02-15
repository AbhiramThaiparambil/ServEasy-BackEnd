import { inject, injectable } from "tsyringe";
import { IServiceBookingRepository } from "../../../../../domain/repositories/IserviceBookingRepository";
import { SocketService } from "../../../../../services/socket/SocketService";
import {
  CancelBookingRequestDTO,
} from "../../../../../application/dtos/user/booking/cancelBooking/CancelBookingDTO";
import { IServiceBooking } from "../../../../../domain/entities/IServiceBooking";
import { ICancelBookingUseCase } from "./ICancelBooking.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";

@injectable()
export class CancelBookingUseCase implements ICancelBookingUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceBookingRepository)
    private serviceBookingRepository: IServiceBookingRepository,
    @inject(SocketService)
    private socketService: SocketService,
  ) {}

  async execute(data: CancelBookingRequestDTO): Promise<IServiceBooking | null> {
    const { bookingId, status, reason } = data;

    const cancelledBooking = await this.serviceBookingRepository.cancelBooking(
      bookingId,
      status,
      reason,
    );

    await this.serviceBookingRepository.addBookingHistory(
      bookingId,
      "cancelled",
      `Cancelled: ${reason}`,
    );

    this.socketService.sendNotificationToUser(
      cancelledBooking?.userId + "",
      cancelledBooking?.userId + "",
      {
        type: "notification",
        targetRole: "USER",
        content: "Your booking has been cancelled",
        timestamp: new Date().toISOString(),
      },
    );

    return cancelledBooking;
  }
}
