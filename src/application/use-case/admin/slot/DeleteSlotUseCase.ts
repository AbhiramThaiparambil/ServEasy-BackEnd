// src/application/useCases/slot/DeleteSlotUseCase.ts
import { injectable, inject } from "tsyringe";
import { ISlotRepository } from "../../../../domain/repositories/ISlotRepository";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";
import { IDeleteSlotUseCase } from "./IDeleteSlotUseCase";

@injectable()
export class DeleteSlotUseCase implements IDeleteSlotUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.SlotRepository)
    private slotRepository: ISlotRepository
  ) {}

  async execute(id: string): Promise<boolean> {
    return await this.slotRepository.deleteSlotById(id);
  }
}
