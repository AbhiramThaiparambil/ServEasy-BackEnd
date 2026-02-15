import { injectable, inject } from "tsyringe";
import { IChatRepository } from "../../../../../domain/repositories/IChatRepository";
import { IChat, IMessage } from "../../../../../domain/entities/IChat";
import { ISaveMessageUseCase } from "./ISaveMessage.uescase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import {
  GetSpecificChatRequestDTO,
  SaveMessageRequestDTO,
  MakeChatOnlineRequestDTO,
  MakeChatOfflineRequestDTO,
} from "../../../../../application/dtos/common/chat/saveMessage/SaveMessageDTO";

@injectable()
export class SaveMessageUseCase implements ISaveMessageUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ChatRepository)
    private chatRepository: IChatRepository
  ) {}

  async getSpecificChat(
    data: GetSpecificChatRequestDTO
  ): Promise<{
    data: IChat | null;
    message: "success" | "noMessages";
  }> {
    const { user1, user2 } = data;

    const chat = await this.chatRepository.findByIds(user1, user2);

    if (!chat) {
      return {
        data: null,
        message: "noMessages",
      };
    }

    return {
      data: chat,
      message: "success",
    };
  }

  async execute(dto: SaveMessageRequestDTO): Promise<IMessage> {
    const { user1, user2, message } = dto;
    const isExist = await this.chatRepository.findByIds(user1, user2);
    console.log(message);

    if (!isExist) {
      const data = await this.chatRepository.createChat(
        user1,
        user2,
        [message]
      );
      return data.messages[data.messages.length - 1];
    } else {
      const chatId = isExist._id?.toString();

      if (!chatId) {
        throw new Error("Chat ID is required");
      }

      const data = await this.chatRepository.addMessage(chatId, message);
      if (!data) {
        return message;
      }
      return data.messages[data.messages.length - 1];
    }
  }

  async makeItOnline(data: MakeChatOnlineRequestDTO): Promise<void> {
    const { onlineId, receiverId } = data;
    this.chatRepository.makeItOnline(receiverId, onlineId);
  }

  async makeItOffline(
    data: MakeChatOfflineRequestDTO
  ): Promise<void> {
    const { senderId, receiverId, offlineId } = data;
    this.chatRepository.makeItOffline(receiverId, senderId, offlineId);
  }
}
