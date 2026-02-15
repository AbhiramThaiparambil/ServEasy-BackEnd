import { inject, injectable } from "tsyringe";
import { IGetProviderAIChatsUseCase } from "./IGetProviderAIChatsusecase";

import { isValidObjectId } from "../../../../../utils/isValidObjectId";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IAiAssistanceRepository } from "../../../../../domain/repositories/IAiAssistanceRepository";
import { IAiAssistanceChatSession } from "../../../../../domain/entities/IAiAssistance";

import { GetProviderAIChatsRequestDTO } from "../../../../dtos/serviceProvider/ai-assistance/getByServiceProvidersId/GetProviderAIChatsRequestDTO";

@injectable()
export class GetProviderAIChatsUseCase implements IGetProviderAIChatsUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.AiAssistanceRepository)
    private readonly aiAssistanceRepository: IAiAssistanceRepository
  ) {}

  async execute(
    data: GetProviderAIChatsRequestDTO
  ): Promise<IAiAssistanceChatSession[] | null> {
    const { providerId } = data;
    try {
      if (!isValidObjectId(providerId)) {
        console.error(` ${providerId} is not valid objectId`);
        return null;
      }
      return await this.aiAssistanceRepository.findByProviderId(providerId);
    } catch (error: unknown) {
      throw error;
    }
  }
}
