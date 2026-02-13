import { WithdrawPaymentRequestDTO } from "../../../../dtos/serviceProvider/wallet/withdrawPayment/WithdrawPaymentRequestDTO";
import { WithdrawPaymentResponseDTO } from "../../../../dtos/serviceProvider/wallet/withdrawPayment/WithdrawPaymentResponseDTO";

export interface IWithdrawPaymentUseCase {
  execute(data: WithdrawPaymentRequestDTO): Promise<WithdrawPaymentResponseDTO>;
}