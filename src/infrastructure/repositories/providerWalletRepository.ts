import { Types } from "mongoose";
import {
  IProviderWallet,
  IWalletTransaction,
} from "../../domain/entities/IproviderWallet";
import { IProviderWalletRepository } from "../../domain/repositories/IproviderWalletRepository";
import { ProviderWalletModel } from "../models/providerWallet";
import { IProviderWalletView } from "../../utils/types/dto/IProviderWalletView";
import { IProviderWalletDetailsView } from "../../utils/types/dto/IProviderWalletDetailsView";
import { getErrorMessage } from "../../utils/errorUtils";

export class ProviderWalletRepository implements IProviderWalletRepository {
  async createWallet(
    serviceProviderId: string
  ): Promise<IProviderWallet> {
    let wallet = await ProviderWalletModel.findOne({ serviceProviderId: new Types.ObjectId(serviceProviderId) });

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

  async addTransaction(
    serviceProviderId: string,
    transaction: IWalletTransaction
  ): Promise<IProviderWallet> {
    const wallet = await ProviderWalletModel.findOne({ serviceProviderId: new Types.ObjectId(serviceProviderId) });
    if (!wallet) throw new Error("Wallet not found");

    wallet.transactions.push(transaction);
    wallet.balance +=
      transaction.type === "credit" ? transaction.amount : -transaction.amount;

    const updatedWallet = await wallet.save();
    return updatedWallet.toObject() as unknown as IProviderWallet;
  }

  async addTransactionWithWalletId(
    walletId: string,
    transaction: IWalletTransaction
  ): Promise<IProviderWallet> {
    const wallet = await ProviderWalletModel.findOne({ _id: walletId });
    if (!wallet) throw new Error("Wallet not found");

    wallet.transactions.push(transaction);
    wallet.balance +=
      transaction.type === "credit" ? transaction.amount : -transaction.amount;

    const updatedWallet = await wallet.save();
    return updatedWallet.toObject() as unknown as IProviderWallet;
  }

  async findByProviderId(
    serviceProviderId: string
  ): Promise<IProviderWallet | null> {
    return ProviderWalletModel.findOne({ serviceProviderId: new Types.ObjectId(serviceProviderId) });
  }

  async findProviderWalletWithPaginatedTransactions(
    serviceProviderId: string,
    limit = 10,
    skip = 0
  ): Promise<IProviderWallet | null> {
    const result = await ProviderWalletModel.aggregate([
      { $match: { serviceProviderId: new Types.ObjectId(serviceProviderId) } },
      {
        $lookup: {
          from: "serviceproviders",
          foreignField: "_id",
          localField: "serviceProviderId",
          as: "providerData",
        },
      },

      {
        $addFields: {
          transactions: {
            $sortArray: { input: "$transactions", sortBy: { date: -1 } },
          },
        },
      },

      {
        $addFields: {
          transactions: {
            $slice: ["$transactions", skip, limit],
          },
        },
      },
      {
        $project: {
          serviceProviderId: 1,
          balance: 1,
          transactions: 1,
          bankDetails: "$providerData.bankDetails",
        },
      },
      { $unwind: "$bankDetails" },
    ]);
    return result[0] || null;
  }

  async findCountOfTransactions(serviceProviderId: string): Promise<number> {
    const result = await ProviderWalletModel.aggregate([
      { $match: { serviceProviderId: new Types.ObjectId(serviceProviderId) } },
      { $project: { count: { $size: "$transactions" } } },
    ]);
    return result[0]?.count || 0;
  }

  findAll(): Promise<IProviderWallet[]> {
    return ProviderWalletModel.find();
  }

  async findPaginatedProviderWallets(
    skip: number,
    limit: number
  ): Promise<IProviderWalletView[]> {
    const data = await ProviderWalletModel.aggregate([
      {
        $addFields: {
          lastTransactionDate: { $max: "$transactions.date" },
        },
      },

      {
        $lookup: {
          from: "serviceproviders",
          localField: "serviceProviderId",
          foreignField: "_id",
          as: "serviceProvider",
        },
      },
      { $unwind: "$serviceProvider" },

      {
        $addFields: {
          isSubscribedProvider: {
            $anyElementTrue: {
              $map: {
                input: "$serviceProvider.subscriptions",
                as: "sub",
                in: {
                  $and: [
                    { $lte: ["$$sub.startDate", new Date()] },
                    { $gte: ["$$sub.endDate", new Date()] },
                    { $eq: ["$$sub.status", "active"] },
                  ],
                },
              },
            },
          },
        },
      },

      {
        $sort: {
          isSubscribedProvider: -1,
          lastTransactionDate: -1,
        },
      },

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
                    { $eq: ["$$txn.status", "pending"] },
                  ],
                },
              },
            },
          },
        },
      },

      {
        $project: {
          _id: 1,
          profileImage: "$serviceProvider.profileImage",
          serviceProviderName: "$serviceProvider.serviceProviderName",
          serviceProviderEmail: "$serviceProvider.serviceProviderEmail",
          serviceProviderPhone: "$serviceProvider.serviceProviderPhone",
          description: "$serviceProvider.description",
          experience: "$serviceProvider.experience",
          isSubscribedProvider: 1,
          wallet: {
            balance: "$balance",
            pending: "$pending",
          },
        },
      },

      { $skip: skip },
      { $limit: limit },
    ]);

    return data;
  }

  async updateTransactionStatus(
    walletId: string,
    transactionId: string,
    newStatus: "success" | "rejected"
  ): Promise<boolean> {
    try {
      const result = await ProviderWalletModel.updateOne(
        {
          _id: new Types.ObjectId(walletId),
          "transactions._id": new Types.ObjectId(transactionId),
        },
        {
          $set: {
            "transactions.$.status": newStatus,
          },
        }
      );
      return result.modifiedCount > 0;
    } catch (e: unknown) {
      console.log(getErrorMessage(e));

      return false;
    }
  }

  async rejectWithdrawAndRevertBalance(
    walletId: string,
    transaction: IWalletTransaction,
    rejectionReason: string
  ): Promise<boolean> {
    const result = await ProviderWalletModel.updateOne(
      {
        _id: new Types.ObjectId(walletId),
        "transactions._id": new Types.ObjectId(transaction._id),
      },
      {
        $set: {
          "transactions.$.status": "rejected",
          "transactions.$.rejectionReason": rejectionReason,
        },
      }
    );

    if (result.modifiedCount === 0) {
      return false;
    }

    const revertTransaction: IWalletTransaction = {
      amount: transaction.amount,
      type: "credit",
      status: "success",
      date: new Date(),
    };

    const added = await this.addTransactionWithWalletId(
      walletId,
      revertTransaction
    );

    return !!added;
  }

  async findProviderWalletByid(
    id: string
  ): Promise<IProviderWalletDetailsView> {
    const data = await ProviderWalletModel.aggregate([
      {
        $match: { _id: new Types.ObjectId(id) },
      },

      {
        $lookup: {
          from: "serviceproviders",
          localField: "serviceProviderId",
          foreignField: "_id",
          as: "serviceProvider",
        },
      },
      { $unwind: "$serviceProvider" },

      {
        $addFields: {
          isSubscribedProvider: {
            $anyElementTrue: {
              $map: {
                input: "$serviceProvider.subscriptions",
                as: "sub",
                in: {
                  $and: [
                    { $lte: ["$$sub.startDate", new Date()] },
                    { $gte: ["$$sub.endDate", new Date()] },
                    { $eq: ["$$sub.status", "active"] },
                  ],
                },
              },
            },
          },
        },
      },

      {
        $addFields: {
          transactions: {
            $sortArray: { input: "$transactions", sortBy: { date: -1 } },
          },
        },
      },

      {
        $addFields: {
          creditTransactions: {
            $filter: {
              input: "$transactions",
              as: "t",
              cond: { $eq: ["$$t.type", "credit"] },
            },
          },
          debitTransactions: {
            $filter: {
              input: "$transactions",
              as: "t",
              cond: { $eq: ["$$t.type", "debit"] },
            },
          },
        },
      },

      {
        $addFields: {
          totalPendingDebit: {
            $sum: {
              $map: {
                input: {
                  $filter: {
                    input: "$transactions",
                    as: "t",
                    cond: {
                      $and: [
                        { $eq: ["$$t.type", "debit"] },
                        { $eq: ["$$t.status", "pending"] },
                      ],
                    },
                  },
                },
                as: "pendingDebit",
                in: "$$pendingDebit.amount",
              },
            },
          },

          totalSuccessDebit: {
            $sum: {
              $map: {
                input: {
                  $filter: {
                    input: "$transactions",
                    as: "t",
                    cond: {
                      $and: [
                        { $eq: ["$$t.type", "debit"] },
                        { $eq: ["$$t.status", "success"] },
                      ],
                    },
                  },
                },
                as: "successDebit",
                in: "$$successDebit.amount",
              },
            },
          },
        },
      },

      {
        $project: {
          _id: 1,
          balance: 1,
          creditTransactions: 1,
          debitTransactions: 1,
          totalPendingDebit: 1,
          totalSuccessDebit: 1,
          isSubscribedProvider: 1, 

          "serviceProvider.profileImage": 1,
          "serviceProvider.serviceProviderName": 1,
          "serviceProvider.serviceProviderEmail": 1,
          "serviceProvider.serviceProviderPhone": 1,
          "serviceProvider.description": 1,
          "serviceProvider.experience": 1,
          "serviceProvider.bankDetails": 1,
        },
      },
    ]);

    return data[0] ?? null;
  }

  async findByTransactionId(
    walletId: string,
    transactionId: string
  ): Promise<IWalletTransaction | null> {
    const result = await ProviderWalletModel.aggregate<IWalletTransaction>([
      {
        $match: {
          _id: new Types.ObjectId(walletId),
        },
      },
      {
        $unwind: "$transactions",
      },
      {
        $match: {
          "transactions._id": new Types.ObjectId(transactionId),
        },
      },
      {
        $replaceRoot: { newRoot: "$transactions" },
      },
    ]);

    return result.length > 0 ? result[0] : null;
  }

  async updateTransactionRejectionReason(
    walletId: string,
    transactionId: string,
    rejectionReason: string
  ): Promise<boolean> {
    try {
      const result = await ProviderWalletModel.updateOne(
        {
          _id: new Types.ObjectId(walletId),
          "transactions._id": new Types.ObjectId(transactionId),
        },
        {
          $set: {
            "transactions.$.rejectionReason": rejectionReason,
          },
        }
      );

      return result.modifiedCount > 0;
    } catch (e: unknown) {
      console.error(getErrorMessage(e));
      return false;
    }
  }
}
