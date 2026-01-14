import { injectable, inject } from "tsyringe";
import { ISlotRepository } from "../../../../domain/repositories/ISlotRepository";
import { ISlot } from "../../../../domain/entities/ISlot";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";

@injectable()
export class MarkSlotAsBookedUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.SlotRepository)
    private slotRepository: ISlotRepository
  ) {}

  async execute(id: string): Promise<ISlot | null> {
    return await this.slotRepository.markSlotAsBooked(id);
  }
}
