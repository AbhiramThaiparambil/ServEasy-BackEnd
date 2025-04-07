import { inject, injectable } from "tsyringe";
import { Types } from "mongoose";
import { RazorpayService } from "../../../services/razorpayService";
import { ServiceRepository } from "../../../infrastructure/repositories/ServiceRepositorie";
import { ServiceBookingRepository } from "../../../infrastructure/repositories/ServiceBookingRepository";
import { ServiceProviderRepository } from "../../../infrastructure/repositories/ServiceProviderRepository";

@injectable()
export class CreateOrderUseCase {
  constructor(
    @inject(RazorpayService) private razorpayService: RazorpayService,
    @inject(ServiceRepository) private serviceRepository: ServiceRepository,
    @inject(ServiceBookingRepository) private serviceBookingRepository: ServiceBookingRepository,
    @inject(ServiceProviderRepository) private serviceProviderRepository: ServiceProviderRepository
  ) {}

  async execute(id: string) {
    try {
      const serviceObjId = new Types.ObjectId(id);
      const service = await this.serviceBookingRepository.findBookedServiceById(serviceObjId);

      if (!service || !service.payment) {
        return { success: false, message: "Service or payment not found" };
      }

      const serviceProvider = await this.serviceProviderRepository.findById(service.serviceProviderId);
     if(!serviceProvider){
        return { success: false, message: "serviceProvider payment not found" };

     }
      const order = await this.razorpayService.createOrder(service.payment,"acc");

      return {  order };
    } catch (error) {
      console.error("CreateOrderUseCase Error:", error);
      return { success: false, message: "Failed to create order" };
    }
  }
}
