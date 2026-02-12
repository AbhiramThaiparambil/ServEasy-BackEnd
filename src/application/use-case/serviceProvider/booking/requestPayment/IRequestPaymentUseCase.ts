import { IServiceBooking } from "../../../../../domain/entities/IServiceBooking";
import { RequestPaymentRequestDTO } from "../../../../dtos/serviceProvider/booking/requestPayment/RequestPaymentRequestDTO";

export interface IRequestPaymentUseCase {
  execute(data: RequestPaymentRequestDTO): Promise<IServiceBooking | null>;
}
