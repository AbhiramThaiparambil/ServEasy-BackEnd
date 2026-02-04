import {
  IServiceProviderChat,
  IUserChat,
} from "../../../../../domain/entities/IChat";

export interface IGetAllChats {
  getServiceProviderChats(id: string): Promise<IUserChat[]>;
  getUserChats(id: string): Promise<IServiceProviderChat[]>;
}
