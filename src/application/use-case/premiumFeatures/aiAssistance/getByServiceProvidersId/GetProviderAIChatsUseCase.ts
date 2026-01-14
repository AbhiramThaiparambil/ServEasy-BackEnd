import { inject, injectable } from "tsyringe";
import { IGetProviderAIChatsUseCase } from "./IGetProviderAIChatsUseCase";

import { isValidObjectId, Types } from "mongoose";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IAiAssistanceRepository } from "../../../../../domain/repositories/IAiAssistanceRepository";
import { IAiAssistanceChatSession } from "../../../../../domain/entities/IAiAssistance";

@injectable()
export class GetProviderAIChatsUseCase implements IGetProviderAIChatsUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.AiAssistanceRepository)
    private readonly aiAssistanceRepository: IAiAssistanceRepository
  ) {}

  async execute(
    providerId: string
  ): Promise<IAiAssistanceChatSession[] | null> {
    try {
      if (!isValidObjectId(providerId)) {
        console.error(` ${providerId} is not valid objectId`);
        return null;
      }
      const objectId = new Types.ObjectId(providerId);
      return await this.aiAssistanceRepository.findByProviderId(objectId);
    } catch (error) {
      throw error;
    }
  }
}
