import { injectable, inject } from "tsyringe";
import { ICleanupSlotsBeforeTodayUseCase } from "./ICleanupSlotsBeforeToday.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { ISlotRepository } from "../../../../../domain/repositories/ISlotRepository";

@injectable()
export class CleanupSlotsBeforeTodayUseCase
  implements ICleanupSlotsBeforeTodayUseCase
{
  constructor(
    @inject(REPOSITORY_TOKENS.SlotRepository)
    private slotRepository: ISlotRepository
  ) {}

  async execute(): Promise<number> {
    return await this.slotRepository.cleanupOldSlots();
  }
}
