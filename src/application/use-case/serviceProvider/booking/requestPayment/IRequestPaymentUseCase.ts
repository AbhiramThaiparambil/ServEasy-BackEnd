import { RequestPaymentRequestDTO } from "../../../../dtos/serviceProvider/booking/requestPayment/RequestPaymentRequestDTO";

export interface IRequestPaymentUseCase {
  execute(data: RequestPaymentRequestDTO): Promise<any>;
}
