import { inject, injectable } from 'tsyringe';
import { IProviderWalletRepository } from '../../../../../domain/repositories/IproviderWalletRepository';
import { REPOSITORY_TOKENS } from '../../../../../utils/constants/tokens';
import { IWithdrawPaymentUseCase } from './IWithdrawPaymentUseCase';
import { Types } from 'mongoose';
import {
  IProviderWallet,
  IWalletTransaction,
} from '../../../../../domain/entities/IproviderWallet';

@injectable()
export class WithdrawPaymentUseCase implements IWithdrawPaymentUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.WalletRepository)
    private walletRepository: IProviderWalletRepository
  ) {}

  async execute(
    serviceProviderId: Types.ObjectId,
    amount: number
  ): Promise<IProviderWallet | null> {
    const wallet = await this.walletRepository.findByProviderId(serviceProviderId);

    if (!wallet) {
      throw new Error('Wallet not found');
    }

    if (wallet.balance < amount) {
      throw new Error('Debit amount greater than balance');
    }

    const transaction: IWalletTransaction = {
      amount,
      type: 'debit',
      status: 'pending',
      date: new Date(),
    };

    return this.walletRepository.addTransaction(serviceProviderId, transaction);
  }
}
