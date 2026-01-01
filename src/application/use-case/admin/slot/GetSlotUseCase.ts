import { injectable, inject } from "tsyringe";
import { ISlotRepository } from "../../../../domain/repositories/ISlotRepository";
import { ISlot } from "../../../../domain/entities/ISlot";
import { isSlotExpired } from "../../../../utils/isSlotExpired";
import { REPOSITORY_TOKENS } from "../../../../utils/constants/tokens";
import { IGetSlotUseCase } from "./IGetSlotUseCase";

@injectable()
export class GetSlotUseCase implements IGetSlotUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.SlotRepository)
    private slotRepository: ISlotRepository
  ) {}

  async execute(serviceId: string): Promise<ISlot[]> {
    console.log(serviceId);
    const slots = await this.slotRepository.getActiveSlotsByServiceId(
      serviceId
    );
    console.log(slots);
    return slots;
  }
}
