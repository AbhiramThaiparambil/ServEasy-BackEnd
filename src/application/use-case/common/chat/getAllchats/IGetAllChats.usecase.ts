


import { GetChatsRequestDTO } from "../../../../../application/dtos/common/chat/getAllchats/GetAllChatsDTO";
import { IServiceProviderChat, IUserChat } from "../../../../../domain/entities/IChat";

export interface IGetAllChats {
  getServiceProviderChats(data: GetChatsRequestDTO): Promise<IUserChat[]>;
  getUserChats(data: GetChatsRequestDTO): Promise<IServiceProviderChat[]>;
}
