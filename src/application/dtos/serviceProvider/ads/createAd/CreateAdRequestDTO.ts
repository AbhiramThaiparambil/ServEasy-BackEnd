import { ILocation } from "../../../../../domain/entities/IService";

export interface CreateAdRequestDTO {
  serviceId: string;
  serviceProviderId: string;
  caption: string;
  description: string;
  image?: string;
  targetLocation?: ILocation;
  radiusKm?: number;
  startDate?: string;
  endDate?: string;
}


