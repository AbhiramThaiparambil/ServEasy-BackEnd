import { inject, injectable } from "tsyringe";
import { RazorpayService } from "../../../../../services/payment/RazorpayService";
import { IProviderWalletRepository } from "../../../../../domain/repositories/IproviderWalletRepository";
import { IWalletTransaction } from "../../../../../domain/entities/IproviderWallet";
import { REPOSITORY_TOKENS, SERVICE_TOKENS } from "../../../../../constants/tokens";
import { IVerifyPaymentUseCase, VerifyPaymentResponseDTO } from "./IVerfypayment.usecase";
import { VerifyPaymentRequestDTO } from "../../../../../application/dtos/common/payment/verifyPayment/VerifyPaymentDTO";
import { getErrorMessage } from "../../../../../utils/errorUtils";
import { SocketService } from "../../../../../services/socket/SocketService";
import { IServiceProviderRepository } from "../../../../../domain/repositories/IserviceProviderRepository";
import { IServiceRepository } from "../../../../../domain/repositories/IServiceRepository";
import { IServiceBookingRepository } from "../../../../../domain/repositories/IserviceBookingRepository";
import { ISystemNotification } from "../../../../../domain/entities/INotification";


@injectable()
export class VerifyPaymentUseCase implements IVerifyPaymentUseCase {
  constructor(
    @inject(SERVICE_TOKENS.RazorpayService)
    private razorpayService: RazorpayService,
    @inject(REPOSITORY_TOKENS.ServiceRepository) private serviceRepository: IServiceRepository,
    @inject(REPOSITORY_TOKENS.ServiceBookingRepository)
    private serviceBookingRepository: IServiceBookingRepository,
    @inject(REPOSITORY_TOKENS.ServiceProviderRepository)
    private serviceProviderRepository: IServiceProviderRepository,
    @inject(REPOSITORY_TOKENS.WalletRepository)
    private walletRepository: IProviderWalletRepository,
    @inject(SocketService)
    private socketService: SocketService,
  ) {}

  async execute(data: VerifyPaymentRequestDTO): Promise<VerifyPaymentResponseDTO> {
    const {
        serviceBookingId: id,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
    } = data;
    try {
      const bookedService =
        await this.serviceBookingRepository.findBookedServiceById(id);

      if (bookedService?.paymentStatus === "completed") {
        return { success: false, message: "Payment already verified" };
      }

      const result = await this.razorpayService.verifyPaymentSignature(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      );
      const service = await this.serviceBookingRepository.findBookedServiceById(id);
      if (service?.isOnlineService) {
        this.serviceBookingRepository.updateServiceStatus(id, "in-progress");
      } else {
        this.serviceBookingRepository.updateServiceStatus(id, "completed");
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
        const userId = await this.serviceProviderRepository.findUserIdByProviderId(service.serviceProviderId)

 const notification: ISystemNotification = {
      type: "notification",
      targetRole:"SERVICE_PROVIDER",
      content: "Payment completed successfully. Service marked as completed.",
      timestamp: new Date().toISOString(),
    };


    this.socketService.sendNotificationToUser(
      userId + "",
      userId + "",
      notification,
    );

    this.socketService.refreshData(userId + "");
      const paymentStatus =
        result.status === "captured" ? "completed" : "failed";

      await this.serviceBookingRepository.updatePaymentStatus(
        id,
        paymentStatus,
        result.method
      );
      return { success: true, message: "Payment verified successfully" };
    } catch (error: unknown) {
      console.error("VerifyPaymentUseCase Error:", getErrorMessage(error));
      return { success: false, message: "Failed to verify payment" };
    }
  }
}
