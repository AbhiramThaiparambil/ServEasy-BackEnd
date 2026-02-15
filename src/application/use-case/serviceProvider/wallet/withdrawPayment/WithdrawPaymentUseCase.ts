import { inject, injectable } from "tsyringe";
import { IProviderWalletRepository } from "../../../../../domain/repositories/IproviderWalletRepository";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IWithdrawPaymentUseCase } from "./IWithdrawPaymentUseCase";
import { IWalletTransaction } from "../../../../../domain/entities/IproviderWallet";
import { WithdrawPaymentRequestDTO } from "../../../../dtos/serviceProvider/wallet/withdrawPayment/WithdrawPaymentRequestDTO";
import { WithdrawPaymentResponseDTO } from "../../../../dtos/serviceProvider/wallet/withdrawPayment/WithdrawPaymentResponseDTO";

@injectable()
export class WithdrawPaymentUseCase implements IWithdrawPaymentUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.WalletRepository)
    private walletRepository: IProviderWalletRepository
  ) {}

  async execute(data: WithdrawPaymentRequestDTO): Promise<WithdrawPaymentResponseDTO> {
    const wallet = await this.walletRepository.findByProviderId(
      data.serviceProviderId
    );

    if (!wallet) {
      return {
        success: false,
        message: "Wallet not found"
      };
    }

    if (wallet.balance < data.amount) {
      return {
        success: false,
        message: "Insufficient balance"
      };
    }

    const transaction: IWalletTransaction = {
      amount: data.amount,
      type: "debit",
      status: "pending",
      date: new Date(),
    };

    const updatedWallet = await this.walletRepository.addTransaction(
      data.serviceProviderId, 
      transaction
    );
    
    return {
      success: true,
      message: "Withdrawal request submitted successfully",
      newBalance: updatedWallet?.balance
    };
  }
}
