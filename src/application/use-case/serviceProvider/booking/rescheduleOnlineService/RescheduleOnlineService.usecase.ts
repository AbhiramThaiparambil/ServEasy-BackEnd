import { injectable, inject } from "tsyringe";
import { Types } from "mongoose";
import { IRescheduleOnlineServiceSlotUseCase } from "./IRescheduleOnlineService.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IServiceBookingRepository } from "../../../../../domain/repositories/IserviceBookingRepository";
import { SocketService } from "../../../../../services/socket/SocketService";
import { RescheduleOnlineServiceRequestDTO } from "../../../../dtos/serviceProvider/booking/rescheduleOnlineService/RescheduleOnlineServiceRequestDTO";

@injectable()
export class RescheduleOnlineServiceSlotUseCase implements IRescheduleOnlineServiceSlotUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceBookingRepository)
    private serviceBookingRepository: IServiceBookingRepository,
    @inject(SocketService)
    private socketService: SocketService,
  ) {}

  async execute(data: RescheduleOnlineServiceRequestDTO): Promise<boolean> {
    const result = await this.serviceBookingRepository.rescheduleOnlineService(
      new Types.ObjectId(data.bookingId),
      data.date,
      data.startTime,
      data.endTime,
    );
    if (!result) {
      return false;
    }
    this.socketService.sendNotificationToUser(
      result.userId.toString(),
      result.userId.toString(),
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
