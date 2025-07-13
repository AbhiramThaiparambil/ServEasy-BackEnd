import { Types } from "mongoose";
import { IProviderWallet, IWalletTransaction } from "../../domain/entities/IproviderWallet";
import { IProviderWalletRepository } from "../../domain/repositories/IproviderWallet";
import { ProviderWalletModel } from "../models/providerWallet";

export class ProviderWalletRepository implements IProviderWalletRepository {

async createWallet(serviceProviderId: Types.ObjectId): Promise<IProviderWallet> {
  let wallet = await ProviderWalletModel.findOne({ serviceProviderId });

  if (!wallet) {
    wallet = new ProviderWalletModel({
      serviceProviderId,
      balance: 0,
      transactions: [],
    });
    await wallet.save();
  }

  return wallet.toObject() as unknown as IProviderWallet;
}

async addTransaction(serviceProviderId: Types.ObjectId, transaction: IWalletTransaction): Promise<IProviderWallet> {
  const wallet = await ProviderWalletModel.findOne({ serviceProviderId });
  if (!wallet) throw new Error("Wallet not found");

  wallet.transactions.push(transaction);
  wallet.balance += transaction.type === "credit" ? transaction.amount : -transaction.amount;

  const updatedWallet = await wallet.save();
  return updatedWallet.toObject() as unknown as IProviderWallet;
}


  async findByProviderId(serviceProviderId: Types.ObjectId): Promise<IProviderWallet | null> {
    return ProviderWalletModel.findOne({ serviceProviderId });
  }

// async findByProviderIdSorted(providerId: string | Types.ObjectId): Promise<IWalletTransaction[]> {
//     const walletDoc = await ProviderWalletModel.findOne({ providerId }).lean();

//     if (!walletDoc || !walletDoc.transactions) return [];

//     const sorted = walletDoc.transactions
//       .filter(tx => tx.date)
//       .map(tx => ({
//         type: tx.type,
//         amount: tx.amount,
//         status: tx.status ?? 'none',
//         refBookingId: new Types.ObjectId(tx.refBookingId),
//         note: tx.note ?? '',
//         date: new Date(tx.date),
//       }))
//       .sort((a, b) => b.date.getTime() - a.date.getTime());

//     return sorted;
//   }

  async findAll(): Promise<IProviderWallet[]> {
    return ProviderWalletModel.find();
  }

// async findAllSorted(): Promise<IWalletTransaction[]> {
//   const wallets = await ProviderWalletModel.find();
//   const allTx: IWalletTransaction[] = wallets.flatMap(w =>
//     w.transactions.map(t => t.toObject())
//   );
//   return allTx.sort((a, b) => b.date.getTime() - a.date.getTime());
// }

  // async findPendingWithdrawals(): Promise<IWalletTransaction[]> {
  //   const wallets = await ProviderWalletModel.find();
  //   return wallets.flatMap(w =>
  //     w.transactions.filter(tx => tx.type === 'debit' && tx.status === 'pending')
  //   ).sort((a, b) => b.date.getTime() - a.date.getTime());
  // }

  // async findDebitTransactionsByProvider(providerId: string): Promise<IWalletTransaction[]> {
  //   const wallet = await ProviderWalletModel.findOne({ providerId });
  //   if (!wallet) return [];
  //   return wallet.transactions
  //     .filter(tx => tx.type === 'debit')
  //     .sort((a, b) => b.date.getTime() - a.date.getTime());
  // }

  // async getTotalCreditsByProvider(providerId: string): Promise<number> {
  //   const wallet = await ProviderWalletModel.findOne({ providerId });
  //   if (!wallet) return 0;

  //   return wallet.transactions
  //     .filter(tx => tx.type === 'credit')
  //     .reduce((sum, tx) => sum + tx.amount, 0);
  // }

  
}
