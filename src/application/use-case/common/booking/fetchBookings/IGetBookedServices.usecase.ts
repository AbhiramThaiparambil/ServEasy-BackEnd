import {
  GetUserBookedServicesRequestDTO,
  GetServiceProviderBookedServicesRequestDTO,
  GetUserBookedServiceCountRequestDTO,
  GetServiceProviderBookedServiceResponseDTO,
} from "../../../../../application/dtos/common/booking/fetchBookings/GetBookedServicesDTO";
import { IBookedServiceWithDetails } from "../../../../../domain/entities/IServiceBooking";

export interface IGetBookedServicesUseCase {
  getUserBookedServices(data: GetUserBookedServicesRequestDTO): Promise<IBookedServiceWithDetails[]>;

  getUserBookedServiceCount(data: GetUserBookedServiceCountRequestDTO): Promise<number>;

  getServiceProviderBookedServices(
    data: GetServiceProviderBookedServicesRequestDTO,
  ): Promise<GetServiceProviderBookedServiceResponseDTO>;
}
