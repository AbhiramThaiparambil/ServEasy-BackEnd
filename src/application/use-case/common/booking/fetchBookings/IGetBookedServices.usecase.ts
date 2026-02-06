import {
  GetUserBookedServicesRequestDTO,
  GetServiceProviderBookedServicesRequestDTO,
  GetUserBookedServiceCountRequestDTO,
} from "../../../../../application/dtos/common/booking/fetchBookings/GetBookedServicesDTO";

export interface IGetBookedServicesUseCase {
  getUserBookedServices(data: GetUserBookedServicesRequestDTO): Promise<any>;

  getUserBookedServiceCount(data: GetUserBookedServiceCountRequestDTO): Promise<number>;

  getServiceProviderBookedServices(
    data: GetServiceProviderBookedServicesRequestDTO,
  ): Promise<{
    services: any;
    count: number;
  }>;
}
