import { injectable, inject } from "tsyringe";

import { IGetSlotUseCase } from "./IGetSlot.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { ISlotRepository } from "../../../../../domain/repositories/ISlotRepository";
import { ISlot } from "../../../../../domain/entities/ISlot";

import { GetSlotsRequestDTO } from "../../../../dtos/serviceProvider/slot/getSlots/GetSlotsRequestDTO";

@injectable()
export class GetSlotUseCase implements IGetSlotUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.SlotRepository)
    private slotRepository: ISlotRepository
  ) {}

  async execute(data: GetSlotsRequestDTO): Promise<ISlot[]> {
    const { serviceId } = data;
    console.log(serviceId);
    const slots = await this.slotRepository.getActiveSlotsByServiceId(
      serviceId
    );
    console.log(slots);
    return slots;
  }
}
