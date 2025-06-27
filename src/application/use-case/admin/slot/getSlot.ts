import { injectable, inject } from 'tsyringe';
import { ISlotRepository } from '../../../../domain/repositories/ISlotRepository';
import { ISlot } from '../../../../domain/entities/ISlot';
import { isSlotExpired } from '../../../../utils/isSlotExpired';

@injectable()
export class GetServiceSlot {
  constructor(
    @inject("ISlotRepository")
    private slotRepository: ISlotRepository
  ) {}

  async execute(serviceId: string): Promise<ISlot[]> {
    const slots = await this.slotRepository.getSlotByServiceIdLearn(serviceId); // returns plain objects

    const updatedSlots = slots.map((slot) => ({
      ...slot,
      booked: isSlotExpired(slot) ? true : slot.booked,
    }));
    return updatedSlots;
  }
}