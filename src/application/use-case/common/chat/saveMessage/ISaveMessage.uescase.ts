import { IChat, IMessage } from "../../../../../domain/entities/IChat";

export interface ISaveMessageUseCase {
  getSpecificChat(
    user1: string,
    user2: string
  ): Promise<{
    data: Promise<IChat> | null;
    message: "success" | "noMessages";
  }>;

  execute(user1: string, user2: string, message: IMessage): Promise<IMessage>;

  makeItOnline(onlineId: string, receiverId: string): Promise<void>;

  makeItOffline(
    senderId: string,
    receiverId: string,
    offlineId: string
  ): Promise<void>;
}
