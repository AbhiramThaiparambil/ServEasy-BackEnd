import { IOnlineService } from "../../../../../domain/entities/IService";
import {
  INearbyServiceFilters,
  INearbyServicePagination,
  INearbyServiceResult,
} from "../../../../../utils/types/dto/INearbyServiceResult";

export interface IGetAllActiveServiceUseCase {
  getNearByServices(
    userLongitude: number | null,
    userLatitude: number | null,
    filters?: INearbyServiceFilters,
    limit?: number,
    cursor?: string | null,
  ): Promise<{
    allFilterServices: INearbyServicePagination;
    categories: { categoryId: string; category: string }[];
    activeServiceNames: string[];
  }>;

  execute(params: { limit: number; cursor?: string | null }): Promise<{
    allServices: INearbyServiceResult[];
    categories: { categoryId: string; category: string }[];
    nextCursor: string | null;
  }>;

  getOnlineServicesWithSlot(serviceId: string): Promise<IOnlineService[]>;
}
