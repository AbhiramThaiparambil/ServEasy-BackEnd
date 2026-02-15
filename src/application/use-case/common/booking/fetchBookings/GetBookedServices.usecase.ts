import { injectable, inject } from "tsyringe";
import { IServiceBookingRepository } from "../../../../../domain/repositories/IserviceBookingRepository";
import { IServiceRepository } from "../../../../../domain/repositories/IServiceRepository";
import { IGetBookedServicesUseCase } from "./IGetBookedServices.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";

import {
  GetUserBookedServicesRequestDTO,
  GetServiceProviderBookedServicesRequestDTO,
  GetUserBookedServiceCountRequestDTO,
  GetServiceProviderBookedServiceResponseDTO,
} from "../../../../../application/dtos/common/booking/fetchBookings/GetBookedServicesDTO";
import { IBookedServiceWithDetails } from "../../../../../domain/entities/IServiceBooking";

@injectable()
export class GetBookedServicesUseCase implements IGetBookedServicesUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceRepository)
    private serviceRepository: IServiceRepository,

    @inject(REPOSITORY_TOKENS.ServiceBookingRepository)
    private serviceBookingRepository: IServiceBookingRepository
  ) {}

  async getUserBookedServices(data: GetUserBookedServicesRequestDTO): Promise<IBookedServiceWithDetails[]> {
    const { userId, skip, limit } = data;

    return this.serviceBookingRepository.findBookedServicesAndServiceByUserId(
      userId,
      skip,
      limit
    );
  }

  async getUserBookedServiceCount(
    data: GetUserBookedServiceCountRequestDTO
  ): Promise<number> {
    const { userId } = data;

    return this.serviceBookingRepository.findCountBookedServicebyUserId(userId);
  }

  async getServiceProviderBookedServices(
    data: GetServiceProviderBookedServicesRequestDTO
  ): Promise<GetServiceProviderBookedServiceResponseDTO> {
    const { serviceProviderId, skip, limit } = data;

    const services =
      await this.serviceBookingRepository.findBookedServicesAndServiceByServiceProviderId(
        serviceProviderId,
        skip,
        limit
      );

    const count = await this.serviceBookingRepository.findCountBookedService(
      serviceProviderId
    );

    return { services, count };
  }
}
