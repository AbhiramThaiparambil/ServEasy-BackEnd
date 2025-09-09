import { Types } from 'mongoose';
import { IAiAssistanceChatSession, IAiAssistanceMessage } from '../entities/IAiAssistance';
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
  //   findByServiceProvider(serviceProviderId: Types.ObjectId): Promise<IAiAssistanceChatSession[]>;
  //   endSession(chatId: Types.ObjectId): Promise<boolean>;
}
