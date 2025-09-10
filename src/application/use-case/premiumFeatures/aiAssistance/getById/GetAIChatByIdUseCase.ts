import { inject, injectable } from 'tsyringe';
import { IAiAssistanceChatSession } from '../../../../../domain/entities/IAiAssistance';
import { IGetAIChatByIdUseCase } from './IGetAIChatByIdUseCase';
import { REPOSITORY_TOKENS } from '../../../../../utils/constants/tokens';
import { IAiAssistanceRepository } from '../../../../../domain/repositories/IAiAssistanceRepository';
import { Types } from 'mongoose';

@injectable()
export class GetAIChatByIdUseCase implements IGetAIChatByIdUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.AiAssistanceRepository) private aiAssistance: IAiAssistanceRepository
  ) {}

  async execute(id: string): Promise<IAiAssistanceChatSession | null> {
    try {
        console.log(id)
        console.log('o-0-0-0-0-0')
      return await this.aiAssistance.findById(new Types.ObjectId(id));
    } catch (error) {
      console.error(error);
      throw new Error('cant find chat ');
    }
  }
}
