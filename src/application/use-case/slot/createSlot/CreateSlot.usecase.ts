import { injectable, inject } from "tsyringe";

import { ICreateSlotUseCase } from "./ICreateSlot.usecase";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";
import { ISlotRepository } from "../../../../domain/repositories/ISlotRepository";
import { ISlot } from "../../../../domain/entities/ISlot";

@injectable()
export class CreateSlotUseCase implements ICreateSlotUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.SlotRepository)
    private slotRepository: ISlotRepository
  ) {}

  async execute(slot: ISlot): Promise<ISlot> {
    return await this.slotRepository.createSlot(slot);
  }
}
