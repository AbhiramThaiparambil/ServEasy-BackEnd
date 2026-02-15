import { injectable, inject } from "tsyringe";

import { ICreateSlotUseCase } from "./ICreateSlot.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { ISlotRepository } from "../../../../../domain/repositories/ISlotRepository";
import { ISlot } from "../../../../../domain/entities/ISlot";

import { CreateSlotRequestDTO } from "../../../../dtos/serviceProvider/slot/createSlot/CreateSlotRequestDTO";

@injectable()
export class CreateSlotUseCase implements ICreateSlotUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.SlotRepository)
    private slotRepository: ISlotRepository
  ) {}

  async execute(data: CreateSlotRequestDTO): Promise<ISlot> {
    const { serviceId, startTime, endTime, booked } = data;
    const slot: ISlot = {
      serviceId,
      startTime,
      endTime,
      booked: booked || false,
    };
    return await this.slotRepository.createSlot(slot);
  }
}
