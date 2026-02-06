import { VerifyPaymentRequestDTO } from "../../../../../application/dtos/common/payment/verifyPayment/VerifyPaymentDTO";

export interface VerifyPaymentResponseDTO {
  success: boolean;
  message: string;
}
export interface IVerifyPaymentUseCase {
  execute(data: VerifyPaymentRequestDTO): Promise<VerifyPaymentResponseDTO>;
}
