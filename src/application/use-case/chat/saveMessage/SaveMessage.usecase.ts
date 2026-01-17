import { injectable, inject } from "tsyringe";
import { IChatRepository } from "../../../../domain/repositories/IChatRepository";
import { IChat, IMessage } from "../../../../domain/entities/IChat";
import mongoose from "mongoose";
import { ISaveMessageUseCase } from "./ISaveMessage.uescase";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";
@injectable()
export class SaveMessageUseCase implements ISaveMessageUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ChatRepository)
    private chatRepository: IChatRepository
  ) {}

  async getSpecificChat(
    user1: string,
    user2: string
  ): Promise<{
    data: Promise<IChat> | null;
    message: "success" | "noMessages";
  }> {
    const user1Id = new mongoose.Types.ObjectId(user1);
    const user2Id = new mongoose.Types.ObjectId(user2);

    const chat = await this.chatRepository.findByIds(user1Id, user2Id);

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

  async execute(
    user1: string,
    user2: string,
    message: IMessage
  ): Promise<IMessage> {
    const isExist = await this.chatRepository.findByIds(
      new mongoose.Types.ObjectId(user1),
      new mongoose.Types.ObjectId(user2)
    );
    console.log(message);

    if (!isExist) {
      const data = await this.chatRepository.createChat(
        new mongoose.Types.ObjectId(user1),
        new mongoose.Types.ObjectId(user2),
        [message]
      );
      return data.messages[data.messages.length - 1];
    } else {
      const data = await this.chatRepository.addMessage(isExist._id, message);
      if (!data) {
        return message;
      }
      return data.messages[data.messages.length - 1];
    }
  }

  async makeItOnline(onlineId: string, receiverId: string): Promise<void> {
    this.chatRepository.makeItOnline(
      new mongoose.Types.ObjectId(receiverId),
      new mongoose.Types.ObjectId(onlineId)
    );
  }

  async makeItOffline(
    senderId: string,
    receiverId: string,
    offlineId: string
  ): Promise<void> {
    this.chatRepository.makeItOffline(
      new mongoose.Types.ObjectId(receiverId),
      new mongoose.Types.ObjectId(senderId),
      new mongoose.Types.ObjectId(offlineId)
    );
  }
}
