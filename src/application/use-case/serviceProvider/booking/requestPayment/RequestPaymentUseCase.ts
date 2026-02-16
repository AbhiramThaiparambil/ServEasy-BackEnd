import { inject, injectable } from "tsyringe";
import { IServiceBookingRepository } from "../../../../../domain/repositories/IserviceBookingRepository";
import { IRequestPaymentUseCase } from "./IRequestPaymentUseCase";
import { IPayment } from "../../../../../domain/entities/IPayment";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { RequestPaymentRequestDTO } from "../../../../dtos/serviceProvider/booking/requestPayment/RequestPaymentRequestDTO";
import { SocketService } from "../../../../../services/socket/SocketService";
import { IServiceBooking } from "../../../../../domain/entities/IServiceBooking";

@injectable()
export class RequestPaymentUseCase implements IRequestPaymentUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceBookingRepository)
    private serviceBookingRepository: IServiceBookingRepository,
    @inject(SocketService)
    private socketService: SocketService,
  ) {}

  async execute(
    data: RequestPaymentRequestDTO,
  ): Promise<IServiceBooking | null> {
    const payment: IPayment = {
      ...data.payment,
      convenienceFee:
        data.payment.total > 100 ? Math.round(data.payment.total * 0.1) : 0,
    };

    const result = await this.serviceBookingRepository.requestPayment(
      data.bookingId,
      data.paymentStatus,
      payment,
    );

    await this.serviceBookingRepository.addBookingHistory(
      data.bookingId,
      "payment-requested",
      "Payment requested",
    );

    this.socketService.sendNotificationToUser(
      result?.userId + "",
      result?.userId + "",
      {
        type: "notification",
        targetRole: "USER",
        content: "Payment requested. Please complete payment to proceed.",
        timestamp: new Date().toISOString(),
      },
    );
    this.socketService.refreshData(result?.userId + "");

    return result;
  }
}
