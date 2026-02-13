import { Types } from "mongoose";
import {
  IChat,
  IMessage,
  IServiceProviderChat,
  IUserChat,
} from "../entities/IChat";

export interface IChatRepository {
  findByIds(senderId: Types.ObjectId, receiverId: Types.ObjectId): Promise<IChat | null>;
  createChat(
    userA: Types.ObjectId,
    userB: Types.ObjectId,
    messages: IMessage[]
  ): Promise<IChat>;
  addMessage(chatId: Types.ObjectId, message: IMessage): Promise<IChat | null>;

  makeItOnline(id1: Types.ObjectId, onlineId: Types.ObjectId): Promise<void>;
  makeItOffline(
    senderId: Types.ObjectId,
    reciverId: Types.ObjectId,
    offlineId: Types.ObjectId
  ): Promise<void>;
  findUsersChats(id: string): Promise<IUserChat[]>;
  findServiceProvidersChat(id: string): Promise<IServiceProviderChat[]>;
}
