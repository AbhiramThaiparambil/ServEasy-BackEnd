import { ICategory } from "../../../../../domain/entities/ICategory ";
import { INearbyServicePagination, INearbyServiceResult } from "../../../../../utils/types/dto/INearbyServiceResult";

export interface GetNearbyServicesRequestDTO {
  userId: string;
  skip: number;
  limit: number;
  userLongitude: number | null;
  userLatitude: number | null;
  filters?: {
    category?: string;
    experience?: number;
    priceSort?: "gtToLow" | "lowTogt";
    searchQuery?: string;
  };
}

export interface GetNearbyServicesResponseDTO {
  allFilterServices: INearbyServicePagination;
  categories: ICategory[];
  activeServiceNames:string[];
}

export interface GetAllActiveServicesRequestDTO {
  skip: number;
  limit: number;
}

export interface GetAllActiveServicesResponseDTO {
  allServices: INearbyServiceResult[];
  categories: { categoryId: string; category: string }[];
}
