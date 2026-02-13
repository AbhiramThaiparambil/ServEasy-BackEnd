import { IPayment } from "../../../../../domain/entities/IPayment";

export interface RequestPaymentRequestDTO {
  bookingId: string;
  payment: IPayment;
  paymentStatus: string;
}
