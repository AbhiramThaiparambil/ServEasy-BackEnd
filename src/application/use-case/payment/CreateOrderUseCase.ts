// import { inject, injectable } from "tsyringe";
// import { Types } from "mongoose";
// import { RazorpayService } from "../../../services/razorpayService";
// import { ServiceRepository } from "../../../infrastructure/repositories/ServiceRepositorie";
// import { ServiceBookingRepository } from "../../../infrastructure/repositories/ServiceBookingRepository";
// import { ServiceProviderRepository } from "../../../infrastructure/repositories/ServiceProviderRepository";

// @injectable()
// export class CreateOrderUseCase {
//   constructor(
//     @inject(RazorpayService) private razorpayService: RazorpayService,
//     @inject(ServiceRepository) private serviceRepository: ServiceRepository,
//     @inject(ServiceBookingRepository) private serviceBookingRepository: ServiceBookingRepository,
//     @inject(ServiceProviderRepository) private serviceProviderRepository: ServiceProviderRepository
//   ) {}

//   async execute(id: string) {
//     try {
//       const serviceObjId = new Types.ObjectId(id);
//       const service = await this.serviceBookingRepository.findBookedServiceById(serviceObjId);

//       if (!service || !service.payment) {
//         return { success: false, message: "Service or payment not found" };
//       }

//       const serviceProvider = await this.serviceProviderRepository.findById(service.serviceProviderId);
//      if(!serviceProvider){
//         return { success: false, message: "serviceProvider payment not found" };

//      }
//      let linkedAccountId =" "
//     //   linkedAccountId=await this.razorpayService.createLinkedAccountTest()
//       const order = await this.razorpayService.createOrder(service.payment,linkedAccountId );

//       return {  order };
//     } catch (error:any) {
//       // console.log(error.response.data);

//       console.error("CreateOrderUseCase Error:", error);
//       return { success: false, message: "Failed to create order" };
//     }
//   }
// }

import { inject, injectable } from "tsyringe";
import { Types } from "mongoose";
import { RazorpayService } from "../../../services/payment/RazorpayService";
import { ServiceRepository } from "../../../infrastructure/repositories/ServiceRepositorie";
import { ServiceBookingRepository } from "../../../infrastructure/repositories/ServiceBookingRepository";
import { ServiceProviderRepository } from "../../../infrastructure/repositories/ServiceProviderRepository";
import { SERVICE_TOKENS } from "../../../utils/constants/tokens";
import { IRedisService } from "../../../services/redis/IRedisService";

@injectable()
export class CreateOrderUseCase {
  constructor(
    @inject(RazorpayService) private razorpayService: RazorpayService,
    @inject(ServiceRepository) private serviceRepository: ServiceRepository,
    @inject(ServiceBookingRepository)
    private serviceBookingRepository: ServiceBookingRepository,
    @inject(ServiceProviderRepository)
    private serviceProviderRepository: ServiceProviderRepository,
    @inject(SERVICE_TOKENS.RedisService) private RedisService: IRedisService
  ) {}

  async execute(id: string) {
    const lockKey = `order-lock:${id}`;
    const ttl = 60;

    const lockAcquired = await this.RedisService.setLock(lockKey, ttl);

    if (!lockAcquired) {
      return {
        success: false,
        message: "We’re processing your order. Please wait...",
      };
    }

    try {
      const serviceObjId = new Types.ObjectId(id);
      const service = await this.serviceBookingRepository.findBookedServiceById(
        serviceObjId
      );

      if (!service || !service.payment) {
        return { success: false, message: "Service or payment not found" };
      }

      const serviceProvider = await this.serviceProviderRepository.findById(
        service.serviceProviderId
      );
      if (!serviceProvider) {
        return {
          success: false,
          message: "Service provider payment details not found",
        };
      }

      const order = await this.razorpayService.createOrder(
        service.payment.total,
        service.userId.toString()
      );

      return { success: true, order };
    } catch (error: any) {
      console.error("CreateOrderUseCase Error:", error);
      return { success: false, message: "Failed to create order" };
    }
  }
}
