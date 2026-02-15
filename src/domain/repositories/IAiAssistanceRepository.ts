import { IAiAssistanceChatInfo, IAiAssistanceChatSession, IAiAssistanceMessage } from '../entities/IAiAssistance';
export interface IAiAssistanceRepository {
  createSession(
    serviceProviderId: string,
    message: IAiAssistanceMessage
  ): Promise<IAiAssistanceChatSession>;
  findById(chatId: string): Promise<IAiAssistanceChatSession | null>;
  addMessage(
    serviceProviderId: string,
    message: IAiAssistanceMessage,
    chatId?:string,
  ): Promise<IAiAssistanceChatSession | null>;
    findByProviderId(serviceProviderId: string): Promise<IAiAssistanceChatSession[]|[]>;
    getChatsInfoByServiceProviderId(serviceProviderId: string): Promise<IAiAssistanceChatInfo[]|[]>;
  //   endSession(chatId: string): Promise<boolean>;
}
