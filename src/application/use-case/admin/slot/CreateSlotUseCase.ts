import { injectable, inject } from 'tsyringe';
import { ISlotRepository } from '../../../../domain/repositories/ISlotRepository';
import { ISlot } from '../../../../domain/entities/ISlot';


@injectable()
export class CreateSlotUseCase {
  constructor(
    @inject("ISlotRepository")
    private slotRepository: ISlotRepository
  ) {}

  async execute(slot: ISlot): Promise<ISlot> {
    return await this.slotRepository.createSlot(slot);
  }
}
