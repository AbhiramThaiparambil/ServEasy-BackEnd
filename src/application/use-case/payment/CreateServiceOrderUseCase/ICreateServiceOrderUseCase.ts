export interface PaymentOrder {
  success: boolean;
  message?: string;
  order?: {};
}

export interface ICreateServiceOrderUseCase {
  execute(serviceBookingId: string): Promise<PaymentOrder>;
}
