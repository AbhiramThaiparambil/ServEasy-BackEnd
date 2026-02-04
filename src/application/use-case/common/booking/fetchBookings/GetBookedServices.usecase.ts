import { injectable, inject } from "tsyringe";
import mongoose from "mongoose";
import { ServiceBookingRepository } from "../../../../../infrastructure/repositories/ServiceBookingRepository";
import { ServiceRepository } from "../../../../../infrastructure/repositories/ServiceRepositorie";
import { IGetBookedServicesUseCase } from "./IGetBookedServices.usecase";

@injectable()
export class GetBookedServicesUseCase implements IGetBookedServicesUseCase {
  constructor(
    @inject(ServiceRepository)
    private serviceRepository: ServiceRepository,

    @inject(ServiceBookingRepository)
    private serviceBookingRepository: ServiceBookingRepository
  ) {}

  async getUserBookedServices(
    userId: mongoose.Types.ObjectId,
    skip: number,
    limit: number
  ) {
    const uId = new mongoose.Types.ObjectId(userId);

    return this.serviceBookingRepository.findBookedServicesAndServiceByUserId(
      uId,
      skip,
      limit
    );
  }

  async getUserBookedServiceCount(
    userId: mongoose.Types.ObjectId
  ): Promise<number> {
    const uId = new mongoose.Types.ObjectId(userId);

    return this.serviceBookingRepository.findCountBookedServicebyUserId(uId);
  }

  async getServiceProviderBookedServices(
    serviceProviderId: mongoose.Types.ObjectId,
    skip: number,
    limit: number
  ) {
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
