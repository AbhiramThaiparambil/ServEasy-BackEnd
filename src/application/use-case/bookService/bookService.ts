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


  
  async bookOnlineService(
    userId: mongoose.Types.ObjectId,
    serviceId: mongoose.Types.ObjectId,
  ): Promise<IServiceBooking> {
    const service = await this.serviceRepository.findById(serviceId);
  
    if (!service) {
      throw new Error("Service not found");
    }
  
    const result = await this.serviceBookingRepository.createServiceBooking({
      serviceProviderId: service.serviceProviderId,
      serviceId,
      userId,
      payment: {
        serviceCost: 0,
        metaialCost: 0,
        travelCost: 0,
        inspectionCost: 0,
        total: service.estimatedPrice,
        convenienceFee: +(service.estimatedPrice * 0.10).toFixed(2),
      },
      serviceStatus: "pending",
      paymentType: "pending",
      paymentStatus: "pending",
      estimatedServiceTime: new Date(),
      bookedTime: new Date(),
      isOnlineService: true,
    });
  
    if (!result) {
      throw new Error("Failed to book service");
    }
  
    return result;
  }
}
