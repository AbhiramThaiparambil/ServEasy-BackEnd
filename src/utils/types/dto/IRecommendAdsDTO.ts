export interface IGetRecommendedAdsRequestDTO {
  count?: number;
  category?: string;
  providerId?: string;
  lat?: number;
  lng?: number;
  radius?: number; 
}

export interface IRecommendedAdDTO {
  _id: string; 

  serviceId: string;
  providerId: string;

  serviceProviderName: string;
  profileImage?: string;

  caption: string;
  description: string;
  image: string | null;
}