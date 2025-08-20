import { inject, injectable } from "tsyringe";
import { Types } from "mongoose";
import { RazorpayService } from "../../../services/razorpayService";
import { ServiceRepository } from "../../../infrastructure/repositories/ServiceRepositorie";
import { ServiceBookingRepository } from "../../../infrastructure/repositories/ServiceBookingRepository";

@injectable()
export class GetPaymentInfoServiceProviderUseCase {
  constructor(
    @inject(RazorpayService) private razorpayService: RazorpayService,
    @inject(ServiceRepository) private serviceRepository: ServiceRepository,
    @inject(ServiceBookingRepository)
    private serviceBookingRepository: ServiceBookingRepository,
    
  ) {}

  async serviceProviderInfo(id: string) {
    const data =
      await this.serviceBookingRepository.findPaymentInfoServiceProvider(id);
    return data;
  }

  async adminPaymentInfo(skip:number,limit:number,search:string,status:string,statusType:'serviceStatus' | 'paymentStatus' = 'serviceStatus') {
    const data = await this.serviceBookingRepository.findPaymentInfoAdmin(skip,limit,search,status,statusType);
    const count= await this.serviceBookingRepository.getBookedServiceCount()
    return {data,count};
  }
}
