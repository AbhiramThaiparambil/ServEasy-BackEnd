import { IPayment } from "../../../../../domain/entities/IPayment";

export interface IRequestPaymentUseCase {
  execute(
    bookingId: string,
    payment: IPayment,
    paymentStatus: string
  ): Promise<any>;
}
