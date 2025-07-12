import { IWalletUseCase } from './IWalletUseCase';
import { IProviderWalletRepository } from '../../../../domain/repositories/IproviderWallet'; 
import { inject, injectable } from 'tsyringe';
import { IProviderWallet, IWalletTransaction } from '../../../../domain/entities/IproviderWallet';

@injectable()
export class WalletUseCase implements IWalletUseCase {
  constructor(
    @inject('IProviderWalletRepository')
    private walletRepo: IProviderWalletRepository
  ) {}

  async addTransactionToProviderWallet(providerId: string, transaction: IWalletTransaction): Promise<IProviderWallet> {
    let wallet = await this.walletRepo.findByProviderId(providerId);

    if (!wallet) {
      wallet = await this.walletRepo.createWallet(providerId);
    }

    return this.walletRepo.addTransaction(providerId, transaction);
  }

  async getProviderWallet(providerId: string): Promise<IProviderWallet | null> {
    return this.walletRepo.findByProviderId(providerId);
  }

  async getAllWallets(): Promise<IProviderWallet[]> {
    return this.walletRepo.findAll();
  }

//   async getTransactionsByProviderSorted(providerId: string): Promise<IWalletTransaction[]> {
//     return this.walletRepo.findByProviderIdSorted(providerId);
//   }

//   async getAllTransactionsSorted(): Promise<IWalletTransaction[]> {
//     return this.walletRepo.findAllSorted();
//   }

//   async getPendingWithdrawals(): Promise<IWalletTransaction[]> {
//     return this.walletRepo.findPendingWithdrawals();
//   }

//   async getDebitTransactionsByProvider(providerId: string): Promise<IWalletTransaction[]> {
//     return this.walletRepo.findDebitTransactionsByProvider(providerId);
//   }

//   async getTotalCreditsByProvider(providerId: string): Promise<number> {
//     return this.walletRepo.getTotalCreditsByProvider(providerId);
//   }
}
