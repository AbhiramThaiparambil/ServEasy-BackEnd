import { inject, injectable } from "tsyringe";
import { IProviderWalletRepository } from "../../../../domain/repositories/IproviderWalletRepository";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";
import { IWithdrawFromProviderWallet } from "../../../../utils/types/dto/IWithdrawFromProviderWallet";
import { IWithdrawFromProviderWalletUseCase } from "./IWithdrawFromProviderWallet.usecase";
import { IWalletTransaction } from "../../../../domain/entities/IproviderWallet";
import { Types } from "mongoose";

@injectable()
export class WithdrawFromProviderWalletUseCase
  implements IWithdrawFromProviderWalletUseCase
{
  constructor(
    @inject(REPOSITORY_TOKENS.WalletRepository)
    private walletRepository: IProviderWalletRepository
  ) {}

  //   async execute(data: IWithdrawFromProviderWallet): Promise<boolean> {
  //    try{
  //  const { walletId, transactionId, newStatus,reason } = data;

  //         const transaction = await this.walletRepository.findByTransactionId(walletId,transactionId)
  // if(!transaction){
  //     throw new Error('transaction not found')
  // }

  //     const updatedTransaction = await this.walletRepository.updateTransactionStatus(
  //       walletId,
  //       transactionId,
  //       newStatus
  //     );
  //       if(newStatus==='rejected'){
  //         this.walletRepository.updateTransactionRejectionReason(walletId,transactionId,reason??"Your transaction has been rejected by the admin")

  //         const newTransaction:IWalletTransaction={amount:transaction.amount,type:'debit',status:'pending',date:new Date()}
  //         this.walletRepository.addTransaction(new Types.ObjectId(walletId),newTransaction)

  //     }

  //     if (!updatedTransaction) {
  //       return false;
  //     }

  //     return true;
  //    }catch(e){
  //       console.log(e)

  //     return false
  //    }
  //   }

  async execute(data: IWithdrawFromProviderWallet): Promise<boolean> {
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
