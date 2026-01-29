import { injectable, inject } from "tsyringe";
import mongoose, { Types } from "mongoose";
import dayjs from "dayjs";
import { IRescheduleOnlineServiceSlotUseCase } from "./IRescheduleOnlineService.usecase";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";
import { IServiceBookingRepository } from "../../../../domain/repositories/IserviceBookingRepository";
import { SocketService } from "../../../../services/socket/SocketService";
import { IServiceBooking } from "../../../../domain/entities/IServiceBooking";

@injectable()
export class RescheduleOnlineServiceSlotUseCase implements IRescheduleOnlineServiceSlotUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceBookingRepository)
    private serviceBookingRepository: IServiceBookingRepository,
    @inject(SocketService)
    private socketService: SocketService,
  ) {}

  async execute(
    bookingId: string,
    date: Date,
    startTime: Date,
    endTime: Date,
  ): Promise<boolean> {
    const data = await this.serviceBookingRepository.rescheduleOnlineService(
      new Types.ObjectId(bookingId),
      date,
      startTime,
      endTime,
    );
    if (!data) {
      return false;
    }
    this.socketService.sendNotificationToUser(
      data.userId.toString(),
      data.userId.toString(),
      {
        type: "notification",
        targetRole: "USER",
        content: `Your booking has been rescheduled to a new date`,
        timestamp: new Date().toISOString(),
      },
    );
    return true;
  }
}
