import {
  GetSpecificChatRequestDTO,
  SaveMessageRequestDTO,
  MakeChatOnlineRequestDTO,
  MakeChatOfflineRequestDTO,
} from "../../../../../application/dtos/common/chat/saveMessage/SaveMessageDTO";
import { IChat, IMessage } from "../../../../../domain/entities/IChat";

export interface ISaveMessageUseCase {
  getSpecificChat(
    data: GetSpecificChatRequestDTO
  ): Promise<{
    data: Promise<IChat> | null;
    message: "success" | "noMessages";
  }>;

  execute(data: SaveMessageRequestDTO): Promise<IMessage>;

  makeItOnline(data: MakeChatOnlineRequestDTO): Promise<void>;

  makeItOffline(
    data: MakeChatOfflineRequestDTO
  ): Promise<void>;
}
