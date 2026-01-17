import { IAiAssistanceChatSession } from "../../../../domain/entities/IAiAssistance";

export interface IGetProviderAIChatsUseCase {
  execute(providerId: string): Promise<IAiAssistanceChatSession[] | null>;
}
