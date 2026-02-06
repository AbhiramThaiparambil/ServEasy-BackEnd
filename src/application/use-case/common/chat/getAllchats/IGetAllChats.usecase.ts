import {
  IServiceProviderChat,
  IUserChat,
} from "../../../../../domain/entities/IChat";

import { GetChatsRequestDTO } from "../../../../../application/dtos/common/chat/getAllchats/GetAllChatsDTO";

export interface IGetAllChats {
  getServiceProviderChats(data: GetChatsRequestDTO): Promise<any>;
  getUserChats(data: GetChatsRequestDTO): Promise<any>;
}
