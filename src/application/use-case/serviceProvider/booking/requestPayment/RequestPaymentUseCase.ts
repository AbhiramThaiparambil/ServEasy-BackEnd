import { inject, injectable } from "tsyringe";
import mongoose from "mongoose";
import { ServiceBookingRepository } from "../../../../../infrastructure/repositories/ServiceBookingRepository";
import { SocketService } from "../../../../../services/socket/SocketService";
import { IPayment } from "../../../../../domain/entities/IPayment";
import { IRequestPaymentUseCase } from "./IRequestPaymentUseCase";

@injectable()
export class RequestPaymentUseCase implements IRequestPaymentUseCase {
  constructor(
    @inject(ServiceBookingRepository)
    private serviceBookingRepository: ServiceBookingRepository,
    @inject(SocketService)
    private socketService: SocketService,
  ) {}

  async execute(
    bookingId: string,
    paymentData: IPayment,
    paymentStatus: string,
  ) {
    const id = new mongoose.Types.ObjectId(bookingId);

    const convenienceFee =
      paymentData.total > 100 ? paymentData.total * 0.1 : 0;

    const payment: IPayment = {
      ...paymentData,
      convenienceFee,
      discountAmount: 0,
      finalTotal: paymentData.total,
    };

    const data = await this.serviceBookingRepository.requestPayment(
      id,
      paymentStatus,
      payment,
    );

    await this.serviceBookingRepository.addBookingHistory(
      id,
      "payment-requested",
      "Payment requested",
    );

    this.socketService.sendNotificationToUser(
      data?.userId + "",
      data?.userId + "",
      {
        type: "notification",
        targetRole:"USER",
        content: "Payment requested. Please complete payment to proceed.",
        timestamp: new Date().toISOString(),
      },
    );

    return data;
  }
}
