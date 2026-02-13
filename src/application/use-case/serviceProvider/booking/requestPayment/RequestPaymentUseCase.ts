import { inject, injectable } from "tsyringe";
import mongoose from "mongoose";
import { ServiceBookingRepository } from "../../../../../infrastructure/repositories/ServiceBookingRepository";
import { SocketService } from "../../../../../services/socket/SocketService";
import { IPayment } from "../../../../../domain/entities/IPayment";
import { IRequestPaymentUseCase } from "./IRequestPaymentUseCase";
import { RequestPaymentRequestDTO } from "../../../../dtos/serviceProvider/booking/requestPayment/RequestPaymentRequestDTO";
import { IServiceBooking } from "../../../../../domain/entities/IServiceBooking";

@injectable()
export class RequestPaymentUseCase implements IRequestPaymentUseCase {
  constructor(
    @inject(ServiceBookingRepository)
    private serviceBookingRepository: ServiceBookingRepository,
    @inject(SocketService)
    private socketService: SocketService,
  ) {}

  async execute(data: RequestPaymentRequestDTO):Promise<IServiceBooking|null> {
    const id = new mongoose.Types.ObjectId(data.bookingId);

    const convenienceFee =
      data.payment.total > 100 ? data.payment.total * 0.1 : 0;

    const payment: IPayment = {
      ...data.payment,
      convenienceFee,
      discountAmount: 0,
      finalTotal: data.payment.total,
    };

    const result = await this.serviceBookingRepository.requestPayment(
      id,
      data.paymentStatus,
      payment,
    );

    await this.serviceBookingRepository.addBookingHistory(
      id,
      "payment-requested",
      "Payment requested",
    );

    this.socketService.sendNotificationToUser(
      result?.userId + "",
      result?.userId + "",
      {
        type: "notification",
        targetRole:"USER",
        content: "Payment requested. Please complete payment to proceed.",
        timestamp: new Date().toISOString(),
      },
    );
    this.socketService.refreshData(result?.userId + "");


    return result;
  }
}
