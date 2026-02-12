import { ICreatePaymentSubscriptionOrderUseCase } from "./ICreatePaymentSubscriptionOrderUseCase";
import { RazorpayService } from "../../../../services/payment/RazorpayService";
import { PaymentOrder } from "./ICreatePaymentSubscriptionOrderUseCase";
import { injectable, inject } from "tsyringe";
import { ISubscriptionPlanRepository } from "../../../../domain/repositories/ISubscriptionPlanRepository";
import {
  REPOSITORY_TOKENS,
  SERVICE_TOKENS,
} from "../../../../constants/tokens";
import { IRedisService } from "../../../../services/redis/IRedisService";

import { CreatePaymentSubscriptionOrderRequestDTO } from "../../../../application/dtos/common/payment/createPaymentSubscriptionOrder/CreatePaymentSubscriptionOrderDTO";

@injectable()
export class CreatePaymentSubscriptionOrderUseCase implements ICreatePaymentSubscriptionOrderUseCase {
  constructor(
    @inject(SERVICE_TOKENS.RazorpayService)
    private razorpayService: RazorpayService,
    @inject(REPOSITORY_TOKENS.SubscriptionRepository)
    private subscriptionPlanRepository: ISubscriptionPlanRepository,
    @inject(SERVICE_TOKENS.RedisService) private redisService: IRedisService,
  ) {}

  async execute(data: CreatePaymentSubscriptionOrderRequestDTO): Promise<PaymentOrder> {
    const { userId, planId } = data;
    const lockKey = `order-lock:${planId}:${userId}`;
    const ttl = 60; 

    const lockAcquired = await this.redisService.setLock(lockKey, ttl);
    if (!lockAcquired) {
      return {
        success: false,
        message: "We’re processing your payment. Please wait...",
      };
    }

    console.log("planId:", planId);
    const plan =
      await this.subscriptionPlanRepository.findSubscriptionPlanById(planId);
    console.log(plan);
    if (!plan) {
      return { success: false, message: "Subscription plan not found" };
    }

    const order = await this.razorpayService.createOrder(plan.price, userId);
    if (!order) {
      return { success: false, message: "Failed to create order" };
    }

    return { success: true, order };
  }
}
``;
