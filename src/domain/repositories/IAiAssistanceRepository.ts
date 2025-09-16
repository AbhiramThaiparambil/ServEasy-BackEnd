import { Types } from 'mongoose';
import { IAiAssistanceChatInfo, IAiAssistanceChatSession, IAiAssistanceMessage } from '../entities/IAiAssistance';
export interface IAiAssistanceRepository {
  createSession(
    serviceProviderId: Types.ObjectId,
    message: IAiAssistanceMessage
  ): Promise<IAiAssistanceChatSession>;
  findById(chatId: Types.ObjectId): Promise<IAiAssistanceChatSession | null>;
  addMessage(
    serviceProviderId: Types.ObjectId,
    message: IAiAssistanceMessage,
    chatId?:string,
  ): Promise<IAiAssistanceChatSession | null>;
    findByProviderId(serviceProviderId: Types.ObjectId): Promise<IAiAssistanceChatSession[]|[]>;
    getChatsInfoByServiceProviderId(serviceProviderId: Types.ObjectId): Promise<IAiAssistanceChatInfo[]|[]>;
  //   endSession(chatId: Types.ObjectId): Promise<boolean>;
}
