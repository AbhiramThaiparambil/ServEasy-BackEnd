// src/application/usecases/subscription/IVerifySubscriptionPaymentUseCase.ts
import { VerifySubscriptionPaymentRequestDTO } from "../../../../application/dtos/common/payment/verifySubscriptionPayment/VerifySubscriptionPaymentDTO";

export interface IVerifySubscriptionPaymentUseCase {
  execute(data: VerifySubscriptionPaymentRequestDTO): Promise<{ success: boolean; message: string }>;
}
