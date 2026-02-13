import { ISlot } from "../../../../../domain/entities/ISlot";
import { CreateSlotRequestDTO } from "../../../../dtos/serviceProvider/slot/createSlot/CreateSlotRequestDTO";

export interface ICreateSlotUseCase {
  execute(data: CreateSlotRequestDTO): Promise<ISlot>;
}
