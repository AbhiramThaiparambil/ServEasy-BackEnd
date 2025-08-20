// src/application/usecases/subscription/VerifySubscriptionPaymentUseCase.ts
import { IVerifySubscriptionPaymentUseCase, VerifyPaymentDTO } from "./IVerifySubscriptionPaymentUseCase";
import { RazorpayService } from "../../../../services/razorpayService";
import { inject, injectable } from "tsyringe";
import { IServiceProviderRepository } from "../../../../domain/repositories/IserviceProviderRepository";
import { ServiceProviderRepository } from "../../../../infrastructure/repositories/ServiceProviderRepository";
import { ISubscription } from "../../../../domain/entities/ISubscription";
import { ISubscriptionPlanRepository } from "../../../../domain/repositories/ISubscriptionPlanRepository";
import { REPOSITORY_TOKENS } from "../../../../utils/constants/tokens";

@injectable()
export class VerifySubscriptionPaymentUseCase implements IVerifySubscriptionPaymentUseCase {
  constructor(
    @inject("RazorpayService") private razorpayService: RazorpayService,
@inject(ServiceProviderRepository)
    private serviceProviderRepository: IServiceProviderRepository,

    @inject(REPOSITORY_TOKENS.SubscriptionRepository)
    private subscriptionPlanRepository: ISubscriptionPlanRepository) {}
async execute(data: VerifyPaymentDTO): Promise<{ success: boolean; message: string }> {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, userId, planId } = data;

    // Step 1: Verify the payment signature with Razorpay
    const isValid = this.razorpayService.verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isValid) {
      return { success: false, message: "Payment verification failed" };
    }

    // Step 2: Fetch subscription plan details
    const subscriptionPlan = await this.subscriptionPlanRepository.findSubscriptionPlanById(planId);
    if (!subscriptionPlan) {
      return { success: false, message: "Subscription plan not found" };
    }

    // Step 3: Create subscription object
    const newSubscription: ISubscription = {
      planId,
      startDate: new Date(),
      endDate: new Date(Date.now() + subscriptionPlan.validityDays * 24 * 60 * 60 * 1000), // plan validity in ms
      status: "active",
      createdAt: new Date(),
      paymentId: razorpay_payment_id,
    };

    // Step 4: Save subscription for the service provider
    const d= await this.serviceProviderRepository.addSubscription(userId, newSubscription);
      console.log(d)
    return { success: true, message: "Payment verified and subscription activated successfully" };
  }
}