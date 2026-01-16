import { ISlot } from "../../../../../domain/entities/ISlot";

export interface IMarkSlotAsBookedUseCase {
  execute(id: string): Promise<ISlot | null>;
}
