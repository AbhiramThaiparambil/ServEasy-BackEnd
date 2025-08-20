// src/application/usecases/subscription/IVerifySubscriptionPaymentUseCase.ts
export interface VerifyPaymentDTO {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  userId: string;
  planId: string;
}

export interface IVerifySubscriptionPaymentUseCase {
  execute(data: VerifyPaymentDTO): Promise<{ success: boolean; message: string }>;
}
