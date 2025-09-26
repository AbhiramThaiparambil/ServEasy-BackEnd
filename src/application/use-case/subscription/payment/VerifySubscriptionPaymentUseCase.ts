// src/application/usecases/subscription/VerifySubscriptionPaymentUseCase.ts
import {
  IVerifySubscriptionPaymentUseCase,
  VerifyPaymentDTO,
} from './IVerifySubscriptionPaymentUseCase';
import { RazorpayService } from '../../../../services/razorpayService';
import { inject, injectable } from 'tsyringe';
import { IServiceProviderRepository } from '../../../../domain/repositories/IserviceProviderRepository';
import { ServiceProviderRepository } from '../../../../infrastructure/repositories/ServiceProviderRepository';
import { ISubscription, ISubscriptionStatus } from '../../../../domain/entities/ISubscription';
import { ISubscriptionPlanRepository } from '../../../../domain/repositories/ISubscriptionPlanRepository';
import { REPOSITORY_TOKENS } from '../../../../utils/constants/tokens';

@injectable()
export class VerifySubscriptionPaymentUseCase implements IVerifySubscriptionPaymentUseCase {
  constructor(
    @inject('RazorpayService') private razorpayService: RazorpayService,
    @inject(ServiceProviderRepository)
    private serviceProviderRepository: IServiceProviderRepository,

    @inject(REPOSITORY_TOKENS.SubscriptionRepository)
    private subscriptionPlanRepository: ISubscriptionPlanRepository
  ) {}
async execute(data: VerifyPaymentDTO): Promise<{ success: boolean; message: string }> {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, planId } = data;

  // Step 1: Verify the payment signature with Razorpay
  const isValid = this.razorpayService.verifyPaymentSignature(
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  );

  if (!isValid) {
    return { success: false, message: 'Payment verification failed' };
  }

  // Step 2: Fetch subscription plan details
  const subscriptionPlan = await this.subscriptionPlanRepository.findSubscriptionPlanById(planId);
  if (!subscriptionPlan) {
    return { success: false, message: 'Subscription plan not found' };
  }

  const existingSub = await this.serviceProviderRepository.findLatestActiveSubscription(userId);

  let startDate = new Date();
  let endDate = new Date(Date.now() + subscriptionPlan.validityDays * 24 * 60 * 60 * 1000);
  let status: ISubscriptionStatus = 'active';
  let message = 'Payment verified and subscription activated successfully';

  if (existingSub && existingSub.endDate > new Date()) {
    // Current subscription is still active → queue new one
    startDate = existingSub.endDate;
    endDate = new Date(
      existingSub.endDate.getTime() +
        subscriptionPlan.validityDays * 24 * 60 * 60 * 1000
    );

    // inclusive: add 1 day
    endDate = new Date(endDate.getTime() + 24 * 60 * 60 * 1000);

    status = 'pending';
    message = 'Payment verified. A new subscription has been created and will activate once your current subscription ends.';
  }

  // Step 3: Create subscription object
  const newSubscription: ISubscription = {
    planId,
    startDate,
    endDate,
    status:"pending",
    createdAt: new Date(),
    paymentId: razorpay_payment_id,
  };

  await this.serviceProviderRepository.addSubscription(userId, newSubscription);

  return { success: true, message };
}

}
