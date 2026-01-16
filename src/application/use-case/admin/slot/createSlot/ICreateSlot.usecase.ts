import { ISlot } from "../../../../../domain/entities/ISlot";

export interface ICreateSlotUseCase {
  execute(slot: ISlot): Promise<ISlot>;
}
