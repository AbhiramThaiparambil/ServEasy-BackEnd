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
  allFilterServices: any;
  categories: any;
  activeServiceNames: any;
}

export interface GetAllActiveServicesRequestDTO {
  skip: number;
  limit: number;
}

export interface GetAllActiveServicesResponseDTO {
  allServices: any;
  categories: any;
}
