import { injectable, inject } from "tsyringe";
import mongoose from "mongoose";

import { ServiceRepository } from "../../../../infrastructure/repositories/ServiceRepositorie";
import { ServiceBookingRepository } from "../../../../infrastructure/repositories/ServiceBookingRepository";
import { ServiceProviderRepository } from "../../../../infrastructure/repositories/ServiceProviderRepository";
import { ReviewRepository } from "../../../../infrastructure/repositories/ReviewRepository";
import { IUserRepository } from "../../../../domain/repositories/IuserRepository";
import { IGetBookedServiceByIdUseCase } from "../fetchBookings/IGetBookedServiceByIdUseCase";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";

@injectable()
export class GetBookedServiceByIdUseCase
  implements IGetBookedServiceByIdUseCase
{
  constructor(
    @inject(ServiceRepository)
    private serviceRepository: ServiceRepository,

    @inject(ServiceBookingRepository)
    private serviceBookingRepository: ServiceBookingRepository,

    @inject(ServiceProviderRepository)
    private serviceProviderRepository: ServiceProviderRepository,

    @inject(ReviewRepository)
    private reviewRepository: ReviewRepository,

    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository
  ) {}

  private async getBookedServiceOrThrow(bookingId: mongoose.Types.ObjectId) {
    const bookedService =
      await this.serviceBookingRepository.findBookedServiceById(bookingId);

    if (!bookedService) {
      throw new Error("Booked service not found");
    }

    return bookedService;
  }

  async getForUser(bookingId: mongoose.Types.ObjectId) {
    const id = new mongoose.Types.ObjectId(bookingId);

    const bookedService = await this.getBookedServiceOrThrow(id);

    const [serviceProvider, service, review] = await Promise.all([
      this.serviceProviderRepository.findById(bookedService.serviceProviderId),
      this.serviceRepository.findById(bookedService.serviceId),
      this.reviewRepository.findByBookingId(id),
    ]);

    return {
      bookedService,
      serviceProvider,
      service,
      review,
    };
  }

  async getForServiceProvider(bookingId: mongoose.Types.ObjectId) {
    const id = new mongoose.Types.ObjectId(bookingId);

    const bookedService = await this.getBookedServiceOrThrow(id);

    const [serviceProvider, service, user, review] = await Promise.all([
      this.serviceProviderRepository.findById(bookedService.serviceProviderId),
      this.serviceRepository.findById(bookedService.serviceId),
      this.userRepository.findById(bookedService.userId.toString()),
      this.reviewRepository.findByBookingId(id),
    ]);

    return {
      bookedService,
      serviceProvider,
      service,
      user,
      review,
    };
  }
}
