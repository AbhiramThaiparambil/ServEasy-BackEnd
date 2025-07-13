
import { Types } from "mongoose";
import { IProviderWallet, IWalletTransaction } from "../../../../domain/entities/IproviderWallet";

export interface IWalletUseCase {
  addTransactionToProviderWallet(providerId: Types.ObjectId, transaction: IWalletTransaction): Promise<IProviderWallet>;
  getProviderWallet(providerId: Types.ObjectId): Promise<IProviderWallet | null>;
  getAllWallets(): Promise<IProviderWallet[]>;

  // getTransactionsByProviderSorted(providerId: string): Promise<IWalletTransaction[]>;
  // getAllTransactionsSorted(): Promise<IWalletTransaction[]>;

  // getPendingWithdrawals(): Promise<IWalletTransaction[]>;
  // getDebitTransactionsByProvider(providerId: string): Promise<IWalletTransaction[]>;
  // getTotalCreditsByProvider(providerId: string): Promise<number>;
}
