import { inject, injectable } from "tsyringe";
import { Types } from "mongoose";
import { RazorpayService } from "../../../../services/payment/RazorpayService";
import { ServiceRepository } from "../../../../infrastructure/repositories/ServiceRepositorie";
import { ServiceBookingRepository } from "../../../../infrastructure/repositories/ServiceBookingRepository";
import { ServiceProviderRepository } from "../../../../infrastructure/repositories/ServiceProviderRepository";
import { IProviderWalletRepository } from "../../../../domain/repositories/IproviderWalletRepository";
import { IWalletTransaction } from "../../../../domain/entities/IproviderWallet";
import { REPOSITORY_TOKENS, SERVICE_TOKENS } from "../../../../constants/tokens";
import { IVerifyPaymentUseCase, VerifyPaymentResponseDTO } from "./IVerfypayment.usecase";
@injectable()
export class VerifyPaymentUseCase implements IVerifyPaymentUseCase {
  constructor(
    @inject(SERVICE_TOKENS.RazorpayService)
    private razorpayService: RazorpayService,
    @inject(ServiceRepository) private serviceRepository: ServiceRepository,
    @inject(ServiceBookingRepository)
    private serviceBookingRepository: ServiceBookingRepository,
    @inject(ServiceProviderRepository)
    private serviceProviderRepository: ServiceProviderRepository,
    @inject(REPOSITORY_TOKENS.WalletRepository)
    private walletRepository: IProviderWalletRepository
  ) {}

  async execute(
    id: string,
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string
  ):Promise<VerifyPaymentResponseDTO>{
    try {
      const serviceObjId = new Types.ObjectId(id);
      const bookedService =
        await this.serviceBookingRepository.findBookedServiceById(serviceObjId);

      if (bookedService?.paymentStatus === "completed") {
        return { success: false, message: "Payment already verified" };
      }

      const result = await this.razorpayService.verifyPaymentSignature(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      );
      const service = await this.serviceBookingRepository.findBookedServiceById(
        serviceObjId
      );
      if (service?.isOnlineService) {
        this.serviceBookingRepository.updateServiceStatus(
          serviceObjId,
          "in-progress"
        );
      } else {
        this.serviceBookingRepository.updateServiceStatus(
          serviceObjId,
          "completed"
        );
      }

      if (!service || !service.serviceProviderId || !service.payment)
        return { success: false, message: "Service not found" };

      let wallet = await this.walletRepository.findByProviderId(
        service?.serviceProviderId
      );

      if (!wallet) {
        wallet = await this.walletRepository.createWallet(
          service?.serviceProviderId
        );
      }

      const transaction: IWalletTransaction = {
        amount: service.payment?.total - service.payment?.convenienceFee,
        type: "credit",
        refBookingId: service._id,
        date: new Date(),
      };

      await this.walletRepository.addTransaction(
        service.serviceProviderId,
        transaction
      );

      const paymentStatus =
        result.status === "captured" ? "completed" : "failed";

      await this.serviceBookingRepository.updatePaymentStatus(
        serviceObjId,
        paymentStatus,
        result.method
      );
      return { success: true, message: "Payment verified successfully" };
    } catch (error) {
      console.error("VerifyPaymentUseCase Error:", error);
      return { success: false, message: "Failed to verify payment" };
    }
  }
}
