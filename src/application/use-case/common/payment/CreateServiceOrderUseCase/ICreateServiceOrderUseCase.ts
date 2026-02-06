export interface PaymentOrder {
  success: boolean;
  message?: string;
  order?: {};
}

import { CreateServiceOrderRequestDTO } from "../../../../../application/dtos/common/payment/createServiceOrder/CreateServiceOrderDTO";

export interface ICreateServiceOrderUseCase {
  execute(data: CreateServiceOrderRequestDTO): Promise<PaymentOrder>;
}
