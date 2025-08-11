import { Types } from "mongoose";
import { IProviderWallet, IWalletTransaction } from "../../domain/entities/IproviderWallet";
import { IProviderWalletRepository } from "../../domain/repositories/IproviderWalletRepository";
import { ProviderWalletModel } from "../models/providerWallet";
import { IProviderWalletView } from "../../utils/types/dto/IProviderWalletView";

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

   async findProviderWalletWithPaginatedTransactions(serviceProviderId: Types.ObjectId, limit?: number, skip?: number): Promise<IProviderWallet | null> {
  const result = await ProviderWalletModel.aggregate([
    { $match: { serviceProviderId } },
    {
      $project: {
        serviceProviderId: 1,
        balance: 1,
        transactions: {
          $slice: [
            {
              $reverseArray: {
                $sortArray: {
                  input: "$transactions",
                  sortBy: { date: -1 }
                }
              }
            },
            skip,
            limit
          ]
        }
      }
    }
  ]);

  return result[0] || null;
}
findAll(): Promise<IProviderWallet[]> {
  return ProviderWalletModel.find()
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

//   async findAll(): Promise<IProviderWallet[]> {

//     // return ProviderWalletModel.find()
//     return ProviderWalletModel.aggregate([
//   // Add a field for the most recent transaction date in each wallet
//   {
//     $addFields: {
//       lastTransactionDate: {
//         $max: "$transactions.date"
//       }
//     }
//   },
//   // Sort wallets based on the latest transaction date (descending)
//   {
//     $sort: { lastTransactionDate: -1 }
//   }
// ]);
//   }



async findPaginatedProviderWallets(skip: number, limit: number): Promise<IProviderWalletView[]> {
  const data = await ProviderWalletModel.aggregate([
    {
      $addFields: {
        lastTransactionDate: { $max: "$transactions.date" }
      }
    },
    { $sort: { lastTransactionDate: -1 } },

    {
      $lookup: {
        from: "serviceproviders",
        localField: "serviceProviderId",
        foreignField: "_id",
        as: "serviceProvider"
      }
    },
    { $unwind: "$serviceProvider" },

    {
      $addFields: {
        pending: {
          $anyElementTrue: {
            $map: {
              input: "$transactions",
              as: "txn",
              in: {
                $and: [
                  { $eq: ["$$txn.type", "debit"] },
                  { $eq: ["$$txn.status", "pending"] }
                ]
              }
            }
          }
        }
      }
    },

    {
      $project: {
        _id: 0,
        profileImage: "$serviceProvider.profileImage",
        serviceProviderName: "$serviceProvider.serviceProviderName",
        serviceProviderEmail: "$serviceProvider.serviceProviderEmail",
        serviceProviderPhone: "$serviceProvider.serviceProviderPhone",
        description: "$serviceProvider.description",
        experience: "$serviceProvider.experience",
        wallet: {
          balance: "$balance",
          pending: "$pending" 
        }
      }
    },

    { $skip: skip },
    { $limit: limit }
  ]);

  return data;
}


  

  // {  _id: '6842b93c7b8517522821206d',
  //     profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
  //     serviceProviderName: 'Arjun Kumar',
  //     serviceProviderEmail: 'arjun.kumar@example.com',
  //     serviceProviderPhone: '+91 9876543210',
  //     description: 'Experienced electrician specializing in home wiring and appliance repair.',
  //     experience: '5 years',
  //     wallet: { balance: 4500 },
  //   }

  
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
