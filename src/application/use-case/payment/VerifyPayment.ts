import { inject, injectable } from 'tsyringe';
import { Types } from 'mongoose';
import { RazorpayService } from '../../../services/razorpayService';
import { ServiceRepository } from '../../../infrastructure/repositories/ServiceRepositorie';
import { ServiceBookingRepository } from '../../../infrastructure/repositories/ServiceBookingRepository';
import { ServiceProviderRepository } from '../../../infrastructure/repositories/ServiceProviderRepository';
import { IProviderWalletRepository } from '../../../domain/repositories/IproviderWallet';
import { IWalletTransaction } from '../../../domain/entities/IproviderWallet';
@injectable()
export class VerifyPaymentUseCase {
  constructor(
    @inject(RazorpayService) private razorpayService: RazorpayService,
    @inject(ServiceRepository) private serviceRepository: ServiceRepository,
    @inject(ServiceBookingRepository) private serviceBookingRepository: ServiceBookingRepository,
    @inject(ServiceProviderRepository) private serviceProviderRepository: ServiceProviderRepository,
    @inject('IProviderWalletRepository') private walletRepository: IProviderWalletRepository
  ) {}

  async execute(
    id: string,
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string
  ) {
    try {
      const serviceObjId = new Types.ObjectId(id);
      const bookedService = await this.serviceBookingRepository.findBookedServiceById(serviceObjId);

      if (bookedService?.paymentStatus === 'completed') {
        return { success: false, message: 'Payment already verified' };
      }

      const result = await this.razorpayService.verifyPaymentSignature(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      );
      const service = await this.serviceBookingRepository.findBookedServiceById(serviceObjId);
      if (service?.isOnlineService) {
        this.serviceBookingRepository.updateServiceStatus(serviceObjId, 'in-progress');
      } else {
        this.serviceBookingRepository.updateServiceStatus(serviceObjId, 'completed');
      }

      if (!service || !service.serviceProviderId || !service.payment) return false;

      let wallet = await this.walletRepository.findByProviderId(service?.serviceProviderId);

      if (!wallet) {
        wallet = await this.walletRepository.createWallet(service?.serviceProviderId);
      }

      const transaction: IWalletTransaction = {
        amount: service.payment?.total - service.payment?.convenienceFee,
        type: 'credit',
        refBookingId: service._id,
        date:new Date()
      };

      await this.walletRepository.addTransaction(service.serviceProviderId, transaction);

      const paymentStatus = result.status === 'captured' ? 'completed' : 'failed';

      await this.serviceBookingRepository.updatePaymentStatus(
        serviceObjId,
        paymentStatus,
        result.method
      );
      return { success: true, message: 'Payment verified successfully' };
    } catch (error) {
      console.error('VerifyPaymentUseCase Error:', error);
      return { success: false, message: 'Failed to verify payment' };
    }
  }
}
