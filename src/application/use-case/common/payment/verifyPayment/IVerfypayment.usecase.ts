export interface VerifyPaymentInputDto {
  id: string,
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string
}

export interface VerifyPaymentResponseDTO {
  success: boolean;
  message: string;
}
export interface IVerifyPaymentUseCase {
  execute( id: string,
    razorpay_order_id: string,
    razorpay_payment_id: string,
    razorpay_signature: string): Promise<VerifyPaymentResponseDTO>;
}
