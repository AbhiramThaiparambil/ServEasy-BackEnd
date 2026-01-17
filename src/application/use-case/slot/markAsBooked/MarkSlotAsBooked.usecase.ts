import { injectable, inject } from "tsyringe";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";
import { ISlot } from "../../../../domain/entities/ISlot";
import { ISlotRepository } from "../../../../domain/repositories/ISlotRepository";

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
