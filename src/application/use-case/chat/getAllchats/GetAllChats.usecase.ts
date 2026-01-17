import { injectable } from "tsyringe";
import { IChatRepository } from "../../../../domain/repositories/IChatRepository";
import { IGetAllChats } from "./IGetAllChats.usecase";

@injectable()
export class GetAllChatsUseCase implements IGetAllChats {
  constructor(private chatRepository: IChatRepository) {}

  async getServiceProviderChats(id: string) {
    const chats = await this.chatRepository.findUsersChats(id);
    console.log(chats);

    return chats;
  }

  async getUserChats(id: string) {
    return this.chatRepository.findServiceProvidersChat(id);
  }
}
