import { inject } from "tsyringe"
import { IProviderWalletRepository } from "../../../../../domain/repositories/IproviderWallet"
import { REPOSITORY_TOKENS } from "../../../../../utils/constants/tokens"
import {IWithdrawPaymentUseCase} from "./IWithdrawPaymentUseCase"
import { Types } from "mongoose"
import { IProviderWallet, IWalletTransaction } from "../../../../../domain/entities/IproviderWallet"

export class WithdrawPaymentUseCase implements IWithdrawPaymentUseCase{
    constructor(@inject(REPOSITORY_TOKENS.WalletRepository ) private walletRepository: IProviderWalletRepository) {}
    execute(serviceProviderId: Types.ObjectId, amount: number): Promise<IProviderWallet | null> {
       const transaction:IWalletTransaction={amount:amount,type:'debit',status:'pending',date:new Date()}
        return  this.walletRepository.addTransaction(
            serviceProviderId,
            transaction
        )
    }
}