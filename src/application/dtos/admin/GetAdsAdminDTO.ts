import { ILocation } from "../../../domain/entities/IService";

export type IAdStatus = "active" | "inactive" | "expired"

export interface IAdminAd {
  _id: string;
  serviceId: string;
  providerId: string;

  serviceProviderName: string;
  profileImage: string;

  caption: string;
  description: string;
  image: string;
  targetLocation: ILocation
  radiusKm: number;
  startDate: string; 
  endDate: string;   
  views: number;
  clicks: number;
  status:IAdStatus;
  createdAt: string;
  updatedAt: string;
}

export interface GetAdsAdminDTO {
    skip: number;
    limit: number;
}

export interface GetAdsAdminResponseDTO {
    count: number;
    ads: IAdminAd[];
}
