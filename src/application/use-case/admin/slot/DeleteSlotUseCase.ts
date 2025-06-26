// src/application/useCases/slot/DeleteSlotUseCase.ts
import { injectable, inject } from 'tsyringe';
import { ISlotRepository } from '../../../../domain/repositories/ISlotRepository';

@injectable()
export class DeleteSlotUseCase {
  constructor(
    @inject("ISlotRepository")
    private slotRepository: ISlotRepository
  ) {}

  async execute(id: string): Promise<boolean> {
    return await this.slotRepository.deleteSlotById(id);
  }
}
