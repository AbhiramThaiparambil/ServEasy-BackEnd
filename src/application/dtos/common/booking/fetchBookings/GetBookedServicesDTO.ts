import { IBookedServiceWithDetails } from "../../../../../domain/entities/IServiceBooking";

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

export interface GetServiceProviderBookedServiceCountRequestDTO {
  serviceProviderId: string;
}

export interface GetServiceProviderBookedServiceResponseDTO {


  
    services: IBookedServiceWithDetails[];
    count: number;
  


  
}

  interface Address {
    _id:string;
  name: string;
  houseName: string;
  pincode: string;
  landmark: string;
  state: string;
  description: string;
  isDefault?: boolean
  phone?: string

}


interface bookedService {
  _id?: string;
  serviceBookedAddress: Address;
  serviceStatus: string;
  paymentType: string;
  serviceName: string;
  serviceType: string;
  serviceImage: string;
  bookedTime: Date;
}

