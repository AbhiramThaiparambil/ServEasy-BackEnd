import { inject, injectable } from "tsyringe";
import { IProviderWalletRepository } from "../../../../../domain/repositories/IproviderWalletRepository";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IWithdrawFromProviderWalletUseCase } from "./IWithdrawFromProviderWallet.usecase";
import { IWalletTransaction } from "../../../../../domain/entities/IproviderWallet";
import { WithdrawRequestDTO } from "../../../../dtos/admin/wallet/WalletManagementDTO";

@injectable()
export class WithdrawFromProviderWalletUseCase
  implements IWithdrawFromProviderWalletUseCase
{
  constructor(
    @inject(REPOSITORY_TOKENS.WalletRepository)
    private walletRepository: IProviderWalletRepository
  ) {}

  async execute(data: WithdrawRequestDTO): Promise<boolean> {
    const { walletId, transactionId, newStatus, reason } = data;

    const transaction = await this.walletRepository.findByTransactionId(
      walletId,
      transactionId
    );
    if (!transaction) throw new Error("Transaction not found");

    if (newStatus === "rejected") {
      return this.handleRejection(walletId, transaction, reason);
    }

    return this.walletRepository.updateTransactionStatus(
      walletId,
      transactionId,
      newStatus
    );
  }

  private async handleRejection(
    walletId: string,
    transaction: IWalletTransaction,
    reason?: string
  ): Promise<boolean> {
    return this.walletRepository.rejectWithdrawAndRevertBalance(
      walletId,
      transaction,
      reason || ""
    );
  }
}
