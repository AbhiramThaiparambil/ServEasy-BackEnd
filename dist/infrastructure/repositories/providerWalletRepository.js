"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderWalletRepository = void 0;
const mongoose_1 = require("mongoose");
const providerWallet_1 = require("../models/providerWallet");
const errorUtils_1 = require("../../utils/errorUtils");
class ProviderWalletRepository {
    createWallet(serviceProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            let wallet = yield providerWallet_1.ProviderWalletModel.findOne({ serviceProviderId: new mongoose_1.Types.ObjectId(serviceProviderId) });
            if (!wallet) {
                wallet = new providerWallet_1.ProviderWalletModel({
                    serviceProviderId,
                    balance: 0,
                    transactions: [],
                });
                yield wallet.save();
            }
            return wallet.toObject();
        });
    }
    addTransaction(serviceProviderId, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const wallet = yield providerWallet_1.ProviderWalletModel.findOne({ serviceProviderId: new mongoose_1.Types.ObjectId(serviceProviderId) });
            if (!wallet)
                throw new Error("Wallet not found");
            wallet.transactions.push(transaction);
            wallet.balance +=
                transaction.type === "credit" ? transaction.amount : -transaction.amount;
            const updatedWallet = yield wallet.save();
            return updatedWallet.toObject();
        });
    }
    addTransactionWithWalletId(walletId, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const wallet = yield providerWallet_1.ProviderWalletModel.findOne({ _id: walletId });
            if (!wallet)
                throw new Error("Wallet not found");
            wallet.transactions.push(transaction);
            wallet.balance +=
                transaction.type === "credit" ? transaction.amount : -transaction.amount;
            const updatedWallet = yield wallet.save();
            return updatedWallet.toObject();
        });
    }
    findByProviderId(serviceProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return providerWallet_1.ProviderWalletModel.findOne({ serviceProviderId: new mongoose_1.Types.ObjectId(serviceProviderId) });
        });
    }
    findProviderWalletWithPaginatedTransactions(serviceProviderId_1) {
        return __awaiter(this, arguments, void 0, function* (serviceProviderId, limit = 10, skip = 0) {
            const result = yield providerWallet_1.ProviderWalletModel.aggregate([
                { $match: { serviceProviderId: new mongoose_1.Types.ObjectId(serviceProviderId) } },
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
        });
    }
    findCountOfTransactions(serviceProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const result = yield providerWallet_1.ProviderWalletModel.aggregate([
                { $match: { serviceProviderId: new mongoose_1.Types.ObjectId(serviceProviderId) } },
                { $project: { count: { $size: "$transactions" } } },
            ]);
            return ((_a = result[0]) === null || _a === void 0 ? void 0 : _a.count) || 0;
        });
    }
    findAll() {
        return providerWallet_1.ProviderWalletModel.find();
    }
    findPaginatedProviderWallets(skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield providerWallet_1.ProviderWalletModel.aggregate([
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
        });
    }
    updateTransactionStatus(walletId, transactionId, newStatus) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield providerWallet_1.ProviderWalletModel.updateOne({
                    _id: new mongoose_1.Types.ObjectId(walletId),
                    "transactions._id": new mongoose_1.Types.ObjectId(transactionId),
                }, {
                    $set: {
                        "transactions.$.status": newStatus,
                    },
                });
                return result.modifiedCount > 0;
            }
            catch (e) {
                console.log((0, errorUtils_1.getErrorMessage)(e));
                return false;
            }
        });
    }
    rejectWithdrawAndRevertBalance(walletId, transaction, rejectionReason) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield providerWallet_1.ProviderWalletModel.updateOne({
                _id: new mongoose_1.Types.ObjectId(walletId),
                "transactions._id": new mongoose_1.Types.ObjectId(transaction._id),
            }, {
                $set: {
                    "transactions.$.status": "rejected",
                    "transactions.$.rejectionReason": rejectionReason,
                },
            });
            if (result.modifiedCount === 0) {
                return false;
            }
            const revertTransaction = {
                amount: transaction.amount,
                type: "credit",
                status: "success",
                date: new Date(),
            };
            const added = yield this.addTransactionWithWalletId(walletId, revertTransaction);
            return !!added;
        });
    }
    findProviderWalletByid(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const data = yield providerWallet_1.ProviderWalletModel.aggregate([
                {
                    $match: { _id: new mongoose_1.Types.ObjectId(id) },
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
            return (_a = data[0]) !== null && _a !== void 0 ? _a : null;
        });
    }
    findByTransactionId(walletId, transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield providerWallet_1.ProviderWalletModel.aggregate([
                {
                    $match: {
                        _id: new mongoose_1.Types.ObjectId(walletId),
                    },
                },
                {
                    $unwind: "$transactions",
                },
                {
                    $match: {
                        "transactions._id": new mongoose_1.Types.ObjectId(transactionId),
                    },
                },
                {
                    $replaceRoot: { newRoot: "$transactions" },
                },
            ]);
            return result.length > 0 ? result[0] : null;
        });
    }
    updateTransactionRejectionReason(walletId, transactionId, rejectionReason) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield providerWallet_1.ProviderWalletModel.updateOne({
                    _id: new mongoose_1.Types.ObjectId(walletId),
                    "transactions._id": new mongoose_1.Types.ObjectId(transactionId),
                }, {
                    $set: {
                        "transactions.$.rejectionReason": rejectionReason,
                    },
                });
                return result.modifiedCount > 0;
            }
            catch (e) {
                console.error((0, errorUtils_1.getErrorMessage)(e));
                return false;
            }
        });
    }
}
exports.ProviderWalletRepository = ProviderWalletRepository;
