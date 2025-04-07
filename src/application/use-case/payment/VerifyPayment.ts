import { inject, injectable } from "tsyringe";
import { Types } from "mongoose";
import { RazorpayService } from "../../../services/razorpayService";
import { ServiceRepository } from "../../../infrastructure/repositories/ServiceRepositorie";
import { ServiceBookingRepository } from "../../../infrastructure/repositories/ServiceBookingRepository";
import { ServiceProviderRepository } from "../../../infrastructure/repositories/ServiceProviderRepository";

@injectable()
export class VerifyPaymentUseCase {
  constructor(
    @inject(RazorpayService) private razorpayService: RazorpayService,
    @inject(ServiceRepository) private serviceRepository: ServiceRepository,
    @inject(ServiceBookingRepository) private serviceBookingRepository: ServiceBookingRepository,
    @inject(ServiceProviderRepository) private serviceProviderRepository: ServiceProviderRepository
  ) {}

  async execute(
    id: string,
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string
  ) {
    try {
      const serviceObjId = new Types.ObjectId(id);
      
      const result = await this.razorpayService.verifyPaymentSignature(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      );
       
      this.serviceBookingRepository.updateServiceStatus(serviceObjId,"completed")
      console.log(result);

      const paymentStatus = result.status === "captured" ? "completed" : "failed";

      await this.serviceBookingRepository.updatePaymentStatus(
        serviceObjId,
        paymentStatus,
        result.method
      );

    } catch (error) {
      console.error("VerifyPaymentUseCase Error:", error);
      return { success: false, message: "Failed to verify payment" };
    }
  }
}
