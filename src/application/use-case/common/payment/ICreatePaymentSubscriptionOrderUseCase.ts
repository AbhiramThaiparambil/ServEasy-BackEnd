export interface PaymentOrder {
  success: boolean;
  message?: string;
  order?:{};
}


import { CreatePaymentSubscriptionOrderRequestDTO } from "../../../../application/dtos/common/payment/createPaymentSubscriptionOrder/CreatePaymentSubscriptionOrderDTO";

export interface ICreatePaymentSubscriptionOrderUseCase {
  execute(data: CreatePaymentSubscriptionOrderRequestDTO): Promise<PaymentOrder>;
}


