export interface GetUserBookedServicesRequestDTO {
  userId: string;
  skip: number;
  limit: number;
}

export interface GetServiceProviderBookedServicesRequestDTO {
  serviceProviderId: string;
  skip: number;
  limit: number;
}

export interface GetUserBookedServiceCountRequestDTO {
  userId: string;
}
