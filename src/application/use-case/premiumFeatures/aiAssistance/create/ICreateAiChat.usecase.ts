import { AiChatResponse } from "../../../../../utils/types/dto/IAiChatResponse";

export interface ICreateAiChatUseCase {
  execute(serviceProviderId: string, prompt: string, activeChatId?:string): Promise<AiChatResponse | void>;
}
