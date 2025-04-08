import { inject, injectable } from "tsyringe";
import { Types } from "mongoose";
import { RazorpayService } from "../../../services/razorpayService";
import { ServiceRepository } from "../../../infrastructure/repositories/ServiceRepositorie";
import { ServiceBookingRepository } from "../../../infrastructure/repositories/ServiceBookingRepository";
import { ServiceProviderRepository } from "../../../infrastructure/repositories/ServiceProviderRepository";

@injectable()
export class GetPaymentInfoServiceProviderUseCase {
  constructor(
    @inject(RazorpayService) private razorpayService: RazorpayService,
    @inject(ServiceRepository) private serviceRepository: ServiceRepository,
    @inject(ServiceBookingRepository)
    private serviceBookingRepository: ServiceBookingRepository,
    @inject(ServiceProviderRepository)
    private serviceProviderRepository: ServiceProviderRepository
  ) {}

  async serviceProviderInfo(id: string) {
    const data =
      await this.serviceBookingRepository.findPaymentInfoServiceProvider(id);
    return data;
  }

  async adminPaymentInfo() {
    const data = await this.serviceBookingRepository.findPaymentInfoAdmin();
    return data;
  }
}
