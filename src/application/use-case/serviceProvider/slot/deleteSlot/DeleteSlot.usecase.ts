import { injectable, inject } from "tsyringe";
import { IDeleteSlotUseCase } from "./IDeleteSlot.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { ISlotRepository } from "../../../../../domain/repositories/ISlotRepository";

import { DeleteSlotRequestDTO } from "../../../../dtos/serviceProvider/slot/deleteSlot/DeleteSlotRequestDTO";

@injectable()
export class DeleteSlotUseCase implements IDeleteSlotUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.SlotRepository)
    private slotRepository: ISlotRepository
  ) {}

  async execute(data: DeleteSlotRequestDTO): Promise<boolean> {
    const { slotId } = data;
    return await this.slotRepository.deleteSlotById(slotId);
  }
}
