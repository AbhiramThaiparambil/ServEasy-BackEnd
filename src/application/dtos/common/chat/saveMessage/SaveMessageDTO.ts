import { IMessage } from "../../../../../domain/entities/IChat";

export interface GetSpecificChatRequestDTO {
  user1: string;
  user2: string;
}

export interface SaveMessageRequestDTO {
  user1: string;
  user2: string;
  message: IMessage;
}

export interface MakeChatOnlineRequestDTO {
  onlineId: string;
  receiverId: string;
}

export interface MakeChatOfflineRequestDTO {
  senderId: string;
  receiverId: string;
  offlineId: string;
}
