import { injectable, inject } from 'tsyringe';
import { ISlotRepository } from '../../../../domain/repositories/ISlotRepository';
import { ISlot } from '../../../../domain/entities/ISlot';

@injectable()
export class GetServiceSlot {
  constructor(
    @inject("ISlotRepository")
    private slotRepository: ISlotRepository
  ) {}

  async execute(id: string): Promise<ISlot[] | []> {
    return await this.slotRepository.getSlotByServiceId(id);
  }
}
