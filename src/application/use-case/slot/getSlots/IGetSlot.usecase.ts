import { ISlot } from "../../../../domain/entities/ISlot";

export interface IGetSlotUseCase {
  execute(serviceId: string): Promise<ISlot[]>;
}
