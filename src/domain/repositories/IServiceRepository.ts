import {
  INearbyServiceFilters,
  INearbyServicePagination,
  INearbyServiceResult,
} from "../../utils/types/dto/INearbyServiceResult";
import { IServiceWithProviderDetails } from "../../utils/types/IServiceWithProviderDetails";
import { ISingleServiceWithProvider } from "../../utils/types/ISingleServiceWithProvider";
import { IOnlineService, IService } from "../entities/IService";

export interface IServiceRepository {
  create(service: IService): Promise<IService>;
  findById(serviceId: string): Promise<IService | null>;
  findAllServiceProviderId(
    serviceProviderId: string,
  ): Promise<IService[]>;

  findAll(): Promise<IService[]>;
  update(
    serviceId: string,
    service: Partial<IService>,
  ): Promise<IService | null>;
  delete(serviceId: string): Promise<boolean>;
  blockService(serviceId: string): Promise<boolean>;
  unblockService(serviceId: string): Promise<boolean>;
  updateService(id: string, newData: IService): Promise<IService | null>;
  findAllActiveServices(): Promise<IService[]>;
  findAllServiceProviderId(
    serviceProviderId: string,
  ): Promise<IService[]>;
  findOnlineServicesWithSlot(): Promise<IOnlineService[] | []>;
  getServicesWithProviderDetailsCount(): Promise<number>;
  getServicesWithProviderDetails(
    skip: number,
    limit: number,
    search: string,
  ): Promise<IServiceWithProviderDetails[]>;

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
