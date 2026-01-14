// application/usecases/slot/CleanupSlotsBeforeTodayUseCase.ts

import { injectable, inject } from "tsyringe";
import { ICleanupSlotsBeforeTodayUseCase } from "./ICleanupSlotsBeforeTodayUseCase";
import { ISlotRepository } from "../../../../domain/repositories/ISlotRepository";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";

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
