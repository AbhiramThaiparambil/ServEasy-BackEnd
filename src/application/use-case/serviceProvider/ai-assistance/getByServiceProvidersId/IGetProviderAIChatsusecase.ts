import { IAiAssistanceChatSession } from "../../../../../domain/entities/IAiAssistance";
import { GetProviderAIChatsRequestDTO } from "../../../../dtos/serviceProvider/ai-assistance/getByServiceProvidersId/GetProviderAIChatsRequestDTO";

export interface IGetProviderAIChatsUseCase {
  execute(
    data: GetProviderAIChatsRequestDTO
  ): Promise<IAiAssistanceChatSession[] | null>;
}
