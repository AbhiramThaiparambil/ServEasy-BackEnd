import { injectable, inject } from "tsyringe";
import { ServiceBookingRepository } from "../../../infrastructure/repositories/ServiceBookingRepository";
import { ServiceRepository } from "../../../infrastructure/repositories/ServiceRepositorie";
import { ServiceProviderRepository } from "../../../infrastructure/repositories/ServiceProviderRepository";
import mongoose from "mongoose";
import { IUserRepository } from "../../../domain/repositories/IuserRepository";
import { ReviewRepository } from "../../../infrastructure/repositories/ReviewRepository";

@injectable()
export class GetBookSingleService {
  constructor(
    @inject(ServiceRepository) private serviceRepository: ServiceRepository,
    @inject(ServiceBookingRepository) private serviceBookingRepository: ServiceBookingRepository,
    @inject(ServiceProviderRepository) private serviceProviderRepository: ServiceProviderRepository
     ,@inject(ReviewRepository) private reviewRepository :ReviewRepository
    , @inject("UserRepository") private userRepository: IUserRepository
  
) {}

  async userBookedService(serviceBookedId: mongoose.Types.ObjectId) {
    const bookedServiceId = new mongoose.Types.ObjectId(serviceBookedId);
    
    const bookedService = await this.serviceBookingRepository.findBookedServiceById(bookedServiceId);
    if (!bookedService) throw new Error("Booked service not found");

    const serviceProvider = await this.serviceProviderRepository.findById(bookedService.serviceProviderId);
    const service = await this.serviceRepository.findById(bookedService.serviceId);
    const review = await this.reviewRepository.findByBookingId(bookedServiceId)

    return {
      bookedService,
      serviceProvider,
      service,
      review,
    };
  }

  async ServiceProviderBookedService(serviceBookedId: mongoose.Types.ObjectId) {
    const bookedServiceId = new mongoose.Types.ObjectId(serviceBookedId);
    
    const bookedService = await this.serviceBookingRepository.findBookedServiceById(bookedServiceId);
    if (!bookedService) throw new Error("Booked service not found");

    const serviceProvider = await this.serviceProviderRepository.findById(bookedService.serviceProviderId);
    const service = await this.serviceRepository.findById(bookedService.serviceId);
    const user= await this.userRepository.findById(bookedService.userId+"")
   const review = await this.reviewRepository.findByBookingId(bookedServiceId)
    return {
      bookedService,
      serviceProvider,
      service,
      user,
      review
    };
  }
}
