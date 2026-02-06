import { inject, injectable } from "tsyringe";
import { IChatRepository } from "../../../../../domain/repositories/IChatRepository";
import { IGetAllChats } from "./IGetAllChats.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";

import { GetChatsRequestDTO } from "../../../../../application/dtos/common/chat/getAllchats/GetAllChatsDTO";

@injectable()
export class GetAllChatsUseCase implements IGetAllChats {
  constructor(
    @inject(REPOSITORY_TOKENS.ChatRepository)
    private chatRepository: IChatRepository,
  ) {}

  async getServiceProviderChats(data: GetChatsRequestDTO) {
    const { id } = data;
    const chats = await this.chatRepository.findUsersChats(id);
    console.log(chats);

    return chats;
  }

  async getUserChats(data: GetChatsRequestDTO) {
    const { id } = data;
    return this.chatRepository.findServiceProvidersChat(id);
  }
}
