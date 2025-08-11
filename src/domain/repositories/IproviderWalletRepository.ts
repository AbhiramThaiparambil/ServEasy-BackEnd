import { Types } from 'mongoose';
import { IProviderWallet, IWalletTransaction } from '../entities/IproviderWallet';
import { IProviderWalletView } from '../../utils/types/dto/IProviderWalletView';

// interface/db/IProviderWalletRepository.ts
export interface IProviderWalletRepository {
  createWallet(providerId: Types.ObjectId): Promise<IProviderWallet>;
  addTransaction(
    providerId: Types.ObjectId,
    transaction: IWalletTransaction
  ): Promise<IProviderWallet>;

  findByProviderId(providerId: Types.ObjectId): Promise<IProviderWallet | null>;
  findProviderWalletWithPaginatedTransactions(
    providerId: Types.ObjectId,
    limit: number,
    skip: number
  ): Promise<IProviderWallet | null>;

  findAll(): Promise<IProviderWallet[]>;
  findPaginatedProviderWallets(skip: number, limit: number): Promise<IProviderWalletView[]>;

  //   findByProviderIdSorted(providerId: string): Promise<IWalletTransaction[]>;
  //   findAllSorted(): Promise<IWalletTransaction[]>;

  //   findPendingWithdrawals(): Promise<IWalletTransaction[]>;
  //   findDebitTransactionsByProvider(providerId: string): Promise<IWalletTransaction[]>;
  //   getTotalCreditsByProvider(providerId: string): Promise<number>;
}
