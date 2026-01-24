import {
  INearbyServiceFilters,
  INearbyServicePagination,
  INearbyServiceResult,
} from "../../utils/types/dto/INearbyServiceResult";
import { ISingleServiceWithProvider } from "../../utils/types/ISingleServiceWithProvider";
import { IOnlineService, IService } from "../entities/IService";
import { Types } from "mongoose";

export interface IServiceRepository {
  create(service: IService): Promise<IService>;
  findById(serviceId: Types.ObjectId): Promise<IService | null>;
  findAllServiceProviderId(
    serviceProviderId: Types.ObjectId | string,
  ): Promise<IService[]>;

  findAll(): Promise<IService[]>;
  update(
    serviceId: Types.ObjectId,
    service: Partial<IService>,
  ): Promise<IService | null>;
  delete(serviceId: Types.ObjectId): Promise<boolean>;
  blockService(serviceId: string): Promise<boolean>;
  unblockService(serviceId: string): Promise<boolean>;
  updateService(id: string, newData: IService): Promise<IService | null>;
  findAllActiveServices(): Promise<IService[]>;
  findAllServiceProviderId(
    serviceProviderId: Types.ObjectId | string,
  ): Promise<IService[]>;
  findOnlineServicesWithSlot(): Promise<IOnlineService[] | []>;
  getServicesWithProviderDetailsCount(): Promise<number>;
  getServicesWithProviderDetails(
    skip: number,
    limit: number,
    search: string,
  ): Promise<any>;

  activateAllServicesByServiceProvider(
    serviceProviderId: string,
  ): Promise<boolean>;

  blockAllserviceServiceProvider(serviceProviderId: string): Promise<boolean>;
  findNearestServicesFilter(
    userId: string,
    skip: number,
    limit: number,
    userLongitude?: number | null,
    userLatitude?: number | null,
    filters?: INearbyServiceFilters,
  ): Promise<INearbyServicePagination>;

  findActiveServiceCategories(): Promise<
    { categoryId: string; category: string }[]
  >;
  getActiveServiceNames(): Promise<string[]>;

  findAllActiveServicesUser(
    skip: number,
    limit: number,
  ): Promise<{ services: INearbyServiceResult[] }>;
  findSingleOnlineServicesWithSlot(
    serviceId: string,
  ): Promise<IOnlineService[]>;
  getSingleServiceWithProviderDetails(
    serviceId: string,
  ): Promise<ISingleServiceWithProvider[]>;
}
