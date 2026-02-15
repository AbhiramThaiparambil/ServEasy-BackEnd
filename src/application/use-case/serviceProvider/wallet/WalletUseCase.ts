import { IWalletUseCase } from "./IWalletUseCase";
import { IProviderWalletRepository } from "../../../../domain/repositories/IproviderWalletRepository";
import { inject, injectable } from "tsyringe";
import {
  IProviderWallet,
  IWalletTransaction,
} from "../../../../domain/entities/IproviderWallet";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";

@injectable()
export class WalletUseCase implements IWalletUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.WalletRepository)
    private walletRepo: IProviderWalletRepository
  ) {}

  async addTransactionToProviderWallet(
    providerId: string,
    transaction: IWalletTransaction
  ): Promise<IProviderWallet> {
    let wallet = await this.walletRepo.findByProviderId(providerId);

    if (!wallet) {
      wallet = await this.walletRepo.createWallet(providerId);
    }

    return this.walletRepo.addTransaction(providerId, transaction);
  }

  async getProviderWallet(
    providerId: string
  ): Promise<IProviderWallet | null> {
    return this.walletRepo.findByProviderId(providerId);
  }

  async getAllWallets(): Promise<IProviderWallet[]> {
    return this.walletRepo.findAll();
  }
}
