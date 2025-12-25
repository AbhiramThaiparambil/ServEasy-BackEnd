import { injectable, inject } from "tsyringe";

import mongoose from "mongoose";
import { ServiceRepository } from "../../../../infrastructure/repositories/ServiceRepositorie";
import { ServiceBookingRepository } from "../../../../infrastructure/repositories/ServiceBookingRepository";
import { ServiceProviderRepository } from "../../../../infrastructure/repositories/ServiceProviderRepository";
import { ReviewRepository } from "../../../../infrastructure/repositories/ReviewRepository";
import { IUserRepository } from "../../../../domain/repositories/IuserRepository";

@injectable()
export class GetBookSingleService {
  constructor(
    @inject(ServiceRepository) private serviceRepository: ServiceRepository,
    @inject(ServiceBookingRepository)
    private serviceBookingRepository: ServiceBookingRepository,
    @inject(ServiceProviderRepository)
    private serviceProviderRepository: ServiceProviderRepository,
    @inject(ReviewRepository) private reviewRepository: ReviewRepository,
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async userBookedService(serviceBookedId: mongoose.Types.ObjectId) {
    const bookedServiceId = new mongoose.Types.ObjectId(serviceBookedId);

    const bookedService =
      await this.serviceBookingRepository.findBookedServiceById(
        bookedServiceId
      );
    if (!bookedService) throw new Error("Booked service not found");

    const serviceProvider = await this.serviceProviderRepository.findById(
      bookedService.serviceProviderId
    );
    const service = await this.serviceRepository.findById(
      bookedService.serviceId
    );
    const review = await this.reviewRepository.findByBookingId(bookedServiceId);

    return {
      bookedService,
      serviceProvider,
      service,
      review,
    };
  }

  async ServiceProviderBookedService(serviceBookedId: mongoose.Types.ObjectId) {
    const bookedServiceId = new mongoose.Types.ObjectId(serviceBookedId);

    const bookedService =
      await this.serviceBookingRepository.findBookedServiceById(
        bookedServiceId
      );
    if (!bookedService) throw new Error("Booked service not found");

    const serviceProvider = await this.serviceProviderRepository.findById(
      bookedService.serviceProviderId
    );
    const service = await this.serviceRepository.findById(
      bookedService.serviceId
    );
    const user = await this.userRepository.findById(bookedService.userId + "");
    const review = await this.reviewRepository.findByBookingId(bookedServiceId);
    return {
      bookedService,
      serviceProvider,
      service,
      user,
      review,
    };
  }
}
