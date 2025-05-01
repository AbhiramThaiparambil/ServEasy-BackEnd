import { injectable } from 'tsyringe';
import { ChatRepository } from '../../../infrastructure/repositories/ChatRepository';

@injectable()
export class GetAllChatsUseCase {
  constructor(private chatRepository: ChatRepository) {}

  async getServiceProviderChats(id:string) {
    const  chats= await this.chatRepository.findUsersChats(id);
  console.log(chats);

  return chats
    
}

  async getUserChats(id:string) {
    return this.chatRepository.findServiceProvidersChat(id);
  }

}