import { injectable, inject } from "tsyringe";
import { ServiceBookingRepository } from "../../../infrastructure/repositories/ServiceBookingRepository";
import { IServiceBooking } from "../../../domain/entities/IserviceBooking";
import { IAddress } from "../../../domain/entities/IAddress";
import { ServiceRepository } from "../../../infrastructure/repositories/ServiceRepositorie";
import mongoose from "mongoose";

@injectable()
export class BookService {
  constructor(
    @inject(ServiceRepository) private serviceRepository: ServiceRepository,
    @inject(ServiceBookingRepository) private serviceBookingRepository: ServiceBookingRepository
  ) {}

  async execute(
    userId: mongoose.Types.ObjectId,
    serviceId: mongoose.Types.ObjectId,
    address: IAddress
  ): Promise<IServiceBooking> {
    const service = await this.serviceRepository.findById(serviceId);
    
    if (!service) {
      throw new Error("Service not found");
    }

    const result = await this.serviceBookingRepository.createServiceBooking({
      serviceProviderId: service.serviceProviderId,
      serviceId,
      address,
      userId,
      serviceStatus: "pending", 
      paymentType: "pending", 
      paymentStatus: "pending",
      estimatedServiceTime: new Date(),
      bookedTime: new Date(),
    });

    if (!result) {
      throw new Error("Failed to book service");
    }

    return result;
  }
}
