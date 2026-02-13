import { inject, injectable } from "tsyringe";
import { Types } from "mongoose";

import {
  ICreateServiceOrderUseCase,
  PaymentOrder,
} from "./ICreateServiceOrderUseCase";

import {
  REPOSITORY_TOKENS,
  SERVICE_TOKENS,
} from "../../../../../constants/tokens";

import { RazorpayService } from "../../../../../services/payment/RazorpayService";
import { IServiceBookingRepository } from "../../../../../domain/repositories/IserviceBookingRepository";
import { IServiceProviderRepository } from "../../../../../domain/repositories/IserviceProviderRepository";
import { IRedisService } from "../../../../../services/redis/IRedisService";

import { CreateServiceOrderRequestDTO } from "../../../../../application/dtos/common/payment/createServiceOrder/CreateServiceOrderDTO";
import { getErrorMessage } from "../../../../../utils/errorUtils";


@injectable()
export class CreateServiceOrderUseCase implements ICreateServiceOrderUseCase {
  constructor(
    @inject(SERVICE_TOKENS.RazorpayService)
    private razorpayService: RazorpayService,
    
    @inject(REPOSITORY_TOKENS.ServiceBookingRepository)
    private readonly serviceBookingRepository: IServiceBookingRepository,

    @inject(REPOSITORY_TOKENS.ServiceProviderRepository)
    private readonly serviceProviderRepository: IServiceProviderRepository,

    @inject(SERVICE_TOKENS.RedisService)
    private readonly redisService: IRedisService,
  ) {}

  async execute(data: CreateServiceOrderRequestDTO): Promise<PaymentOrder> {
    const { serviceBookingId } = data;
    const lockKey = `order-lock:${serviceBookingId}`;
    const lockTTL = 60;

    const lockAcquired = await this.redisService.setLock(lockKey, lockTTL);

    if (!lockAcquired) {
      return {
        success: false,
        message: "Order creation already in progress. Please wait...",
      };
    }

    try {
      const bookingId = new Types.ObjectId(serviceBookingId);

      const booking =
        await this.serviceBookingRepository.findBookedServiceById(bookingId);

      if (!booking || !booking.payment) {
        return {
          success: false,
          message: "Service booking or payment details not found",
        };
      }

      const serviceProvider = await this.serviceProviderRepository.findById(
        booking.serviceProviderId,
      );

      if (!serviceProvider) {
        return {
          success: false,
          message: "Service provider payment details not available",
        };
      }

      const finalAmount = this.calculateFinalAmount(
        booking.payment.total,
        booking.coupon?.discountAmount,
      );

      const order = await this.razorpayService.createOrder(
        finalAmount,
        booking.userId.toString(),
      );

      return { success: true, order };
    } catch (error: unknown) {
      console.error("[CreateServiceOrderUseCase]", getErrorMessage(error));
      return {
        success: false,
        message: "Failed to create payment order",
      };
    }
  }

  private calculateFinalAmount(
    totalAmount: number,
    discountAmount?: number,
  ): number {
    if (!discountAmount) return totalAmount;
    return Math.max(totalAmount - discountAmount, 0);
  }
}
