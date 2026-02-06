import { ISlot } from "../../../../../domain/entities/ISlot";
import { GetSlotsRequestDTO } from "../../../../dtos/serviceProvider/slot/getSlots/GetSlotsRequestDTO";

export interface IGetSlotUseCase {
  execute(data: GetSlotsRequestDTO): Promise<ISlot[]>;
}
