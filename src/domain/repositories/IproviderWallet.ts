import { IProviderWallet, IWalletTransaction } from "../entities/IproviderWallet";

// interface/db/IProviderWalletRepository.ts
export interface IProviderWalletRepository {
  createWallet(providerId: string): Promise<IProviderWallet>;
  addTransaction(providerId: string, transaction: IWalletTransaction): Promise<IProviderWallet>;
  
  findByProviderId(providerId: string): Promise<IProviderWallet | null>;
  findAll(): Promise<IProviderWallet[]>;

//   findByProviderIdSorted(providerId: string): Promise<IWalletTransaction[]>;
//   findAllSorted(): Promise<IWalletTransaction[]>;

//   findPendingWithdrawals(): Promise<IWalletTransaction[]>;
//   findDebitTransactionsByProvider(providerId: string): Promise<IWalletTransaction[]>;
//   getTotalCreditsByProvider(providerId: string): Promise<number>;
}
