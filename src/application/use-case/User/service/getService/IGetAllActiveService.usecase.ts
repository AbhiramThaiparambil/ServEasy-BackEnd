import { IOnlineService } from "../../../../../domain/entities/IService";
import {
  INearbyServiceFilters,
  INearbyServicePagination,
  INearbyServiceResult,
} from "../../../../../utils/types/dto/INearbyServiceResult";

export interface IGetAllActiveServiceUseCase {
  getNearByServices(
    userId: string,
    skip: number,
    limit: number,
    userLongitude: number | null,
    userLatitude: number | null,
    filters?: INearbyServiceFilters,
  ): Promise<{
    allFilterServices: INearbyServicePagination;
    categories: { categoryId: string; category: string }[];
    activeServiceNames: string[];
  }>;

  execute(
    skip: number,
    limit: number,
  ): Promise<{
    allServices: INearbyServiceResult[];
    categories: { categoryId: string; category: string }[];
  }>;

  getOnlineServicesWithSlot(serviceId: string): Promise<IOnlineService[]>;
}
