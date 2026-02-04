import { inject, injectable } from "tsyringe";
import { IChatRepository } from "../../../../../domain/repositories/IChatRepository";
import { IGetAllChats } from "./IGetAllChats.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";

@injectable()
export class GetAllChatsUseCase implements IGetAllChats {
  constructor(
    @inject(REPOSITORY_TOKENS.ChatRepository)
    private chatRepository: IChatRepository,
  ) {}

  async getServiceProviderChats(id: string) {
    const chats = await this.chatRepository.findUsersChats(id);
    console.log(chats);

    return chats;
  }

  async getUserChats(id: string) {
    return this.chatRepository.findServiceProvidersChat(id);
  }
}
