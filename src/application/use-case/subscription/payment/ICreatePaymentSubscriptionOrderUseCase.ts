export interface PaymentOrder {
  success: boolean;
  message?: string;
  order?:{};
}


export interface ICreatePaymentSubscriptionOrderUseCase {
  execute(userId: string, planId: string): Promise<PaymentOrder>;
}


