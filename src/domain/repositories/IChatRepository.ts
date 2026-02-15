import {
  IChat,
  IMessage,
  IServiceProviderChat,
  IUserChat,
} from "../entities/IChat";

export interface IChatRepository {
  findByIds(senderId: string, receiverId: string): Promise<IChat | null>;
  createChat(
    userA: string,
    userB: string,
    messages: IMessage[]
  ): Promise<IChat>;
  addMessage(chatId: string, message: IMessage): Promise<IChat | null>;

  makeItOnline(id1: string, onlineId: string): Promise<void>;
  makeItOffline(
    senderId: string,
    reciverId: string,
    offlineId: string
  ): Promise<void>;
  findUsersChats(id: string): Promise<IUserChat[]>;
  findServiceProvidersChat(id: string): Promise<IServiceProviderChat[]>;
}
