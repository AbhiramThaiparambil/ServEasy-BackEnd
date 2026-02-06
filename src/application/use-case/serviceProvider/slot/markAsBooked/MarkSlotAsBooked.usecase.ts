import { injectable, inject } from "tsyringe";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { ISlot } from "../../../../../domain/entities/ISlot";
import { ISlotRepository } from "../../../../../domain/repositories/ISlotRepository";
import { MarkSlotBookedRequestDTO } from "../../../../dtos/serviceProvider/slot/MarkSlotAsBookedDTO";
import { IMarkSlotAsBookedUseCase } from "./IMarkSlotAsBooked.usecase";

@injectable()
export class MarkSlotAsBookedUseCase implements IMarkSlotAsBookedUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.SlotRepository)
    private slotRepository: ISlotRepository
  ) {}

  async execute(data: MarkSlotBookedRequestDTO): Promise<ISlot | null> {
    return await this.slotRepository.markSlotAsBooked(data.slotId);
  }
}
