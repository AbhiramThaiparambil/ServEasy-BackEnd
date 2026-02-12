import { injectable, inject } from "tsyringe";
import mongoose from "mongoose";
import { ServiceBookingRepository } from "../../../../../infrastructure/repositories/ServiceBookingRepository";
import { ServiceRepository } from "../../../../../infrastructure/repositories/ServiceRepositorie";
import { IGetBookedServicesUseCase } from "./IGetBookedServices.usecase";

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
    @inject(ServiceRepository)
    private serviceRepository: ServiceRepository,

    @inject(ServiceBookingRepository)
    private serviceBookingRepository: ServiceBookingRepository
  ) {}

  async getUserBookedServices(data: GetUserBookedServicesRequestDTO): Promise<IBookedServiceWithDetails[]> {
    const { userId, skip, limit } = data;
    const uId = new mongoose.Types.ObjectId(userId);

    return this.serviceBookingRepository.findBookedServicesAndServiceByUserId(
      uId,
      skip,
      limit
    );
  }

  async getUserBookedServiceCount(
    data: GetUserBookedServiceCountRequestDTO
  ): Promise<number> {
    const { userId } = data;
    const uId = new mongoose.Types.ObjectId(userId);

    return this.serviceBookingRepository.findCountBookedServicebyUserId(uId);
  }

  async getServiceProviderBookedServices(
    data: GetServiceProviderBookedServicesRequestDTO
  ): Promise<GetServiceProviderBookedServiceResponseDTO> {
    const { serviceProviderId, skip, limit } = data;
    const sId = new mongoose.Types.ObjectId(serviceProviderId);

    const services =
      await this.serviceBookingRepository.findBookedServicesAndServiceByServiceProviderId(
        sId,
        skip,
        limit
      );

    const count = await this.serviceBookingRepository.findCountBookedService(
      sId
    );

 
     

    return { services, count };
  }
}
