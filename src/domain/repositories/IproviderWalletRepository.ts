import { IProviderWallet, IWalletTransaction } from '../entities/IproviderWallet';
import { IProviderWalletView } from '../../utils/types/dto/IProviderWalletView';
import { IProviderWalletDetailsView } from '../../utils/types/dto/IProviderWalletDetailsView';

export interface IProviderWalletRepository {
  createWallet(providerId: string): Promise<IProviderWallet>;
  addTransaction(
    providerId: string,
    transaction: IWalletTransaction
  ): Promise<IProviderWallet>;

  findByProviderId(providerId: string): Promise<IProviderWallet | null>;
  findProviderWalletWithPaginatedTransactions(
    providerId: string,
    limit: number,
    skip: number
  ): Promise<IProviderWallet | null>;

  findAll(): Promise<IProviderWallet[]>;
  findPaginatedProviderWallets(skip: number, limit: number): Promise<IProviderWalletView[]>;
  findProviderWalletByid(id: string): Promise<IProviderWalletDetailsView>;

  updateTransactionStatus(
    walletId: string,
    transactionId: string,
    newStatus: 'success' | 'rejected'
  ): Promise<boolean>;

  findByTransactionId(walletId: string, transactionId: string): Promise<IWalletTransaction | null>;

  updateTransactionRejectionReason(
    walletId: string,
    transactionId: string,
    rejectionReason: string
  ): Promise<boolean>;

  rejectWithdrawAndRevertBalance(
    walletId: string,
    transaction: IWalletTransaction,
    rejectionReason: string
  ): Promise<boolean>;

  addTransactionWithWalletId(
    walletId: string,
    transaction: IWalletTransaction
  ): Promise<IProviderWallet>;
   findCountOfTransactions(serviceProviderId: string): Promise<number> 

  //   findByProviderIdSorted(providerId: string): Promise<IWalletTransaction[]>;
  //   findAllSorted(): Promise<IWalletTransaction[]>;

  //   findPendingWithdrawals(): Promise<IWalletTransaction[]>;
  //   findDebitTransactionsByProvider(providerId: string): Promise<IWalletTransaction[]>;
  //   getTotalCreditsByProvider(providerId: string): Promise<number>;
}
