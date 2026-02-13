import { RescheduleOnlineServiceRequestDTO } from "../../../../dtos/serviceProvider/booking/rescheduleOnlineService/RescheduleOnlineServiceRequestDTO";

export interface IRescheduleOnlineServiceSlotUseCase {
  execute(data: RescheduleOnlineServiceRequestDTO): Promise<boolean>;
}
