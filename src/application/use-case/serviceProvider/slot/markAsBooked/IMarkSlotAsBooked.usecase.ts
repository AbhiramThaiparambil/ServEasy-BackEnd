import { ISlot } from "../../../../../domain/entities/ISlot";
import { MarkSlotBookedRequestDTO } from "../../../../dtos/serviceProvider/slot/MarkSlotAsBookedDTO";

export interface IMarkSlotAsBookedUseCase {
  execute(data: MarkSlotBookedRequestDTO): Promise<ISlot | null>;
}
