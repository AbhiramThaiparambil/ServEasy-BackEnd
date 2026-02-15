export interface GetRecommendedAdsRequestDTO {
  count?: number;
  category?: string;
  providerId?: string;
  lat?: number;
  lng?: number;
  radius?: number; 
}

export interface RecommendedAdDTO {
  _id: string; 
  serviceId: string;
  providerId: string;
  serviceProviderName: string;
  profileImage?: string;
  caption: string;
  description: string;
  image: string | null;
}
