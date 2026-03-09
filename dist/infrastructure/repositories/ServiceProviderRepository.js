"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceProviderRepository = void 0;
const tsyringe_1 = require("tsyringe");
const ServiceProviderModel_1 = __importDefault(require("../models/ServiceProviderModel"));
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_2 = require("mongoose");
let ServiceProviderRepository = class ServiceProviderRepository {
    create(serviceProvider) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(serviceProvider.bankDetails);
            const newProvider = new ServiceProviderModel_1.default(serviceProvider);
            return yield newProvider.save();
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceProviderModel_1.default.findOne({ email });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceProviderModel_1.default.findById(id);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceProviderModel_1.default.findByIdAndUpdate(id, data, {
                new: true,
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield ServiceProviderModel_1.default.findByIdAndDelete(id);
            return result !== null;
        });
    }
    findServiceProviderSkipLimit(skip, limit, search) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceProviderModel_1.default.find({
                $or: [
                    { serviceProviderName: { $regex: search, $options: "i" } },
                    { serviceProviderEmail: { $regex: search, $options: "i" } },
                ],
            })
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });
        });
    }
    findServiceProvidersCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceProviderModel_1.default.countDocuments();
        });
    }
    findByUserID(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const provider = yield ServiceProviderModel_1.default.findOne({ userId });
            if (!provider)
                return null;
            const now = new Date();
            const activeSubscription = ((_a = provider.subscription) !== null && _a !== void 0 ? _a : []).find((sub) => sub.status === "active" && sub.startDate <= now && sub.endDate >= now);
            return Object.assign(Object.assign({}, provider.toObject()), { isProServiceProvider: !!activeSubscription });
        });
    }
    findSubscriptionIsActiveOrNot(providerId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const provider = yield ServiceProviderModel_1.default.findOne({
                _id: providerId,
                subscription: {
                    $elemMatch: {
                        startDate: { $lte: new Date() },
                        endDate: { $gte: new Date() },
                        status: "active",
                    },
                },
            }, { "subscription.$": 1 });
            if (!provider || ((_a = provider.subscription) === null || _a === void 0 ? void 0 : _a.length) === 0) {
                return { isActive: false };
            }
            return { isActive: true };
        });
    }
    findSubscriptions(providerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            const result = yield ServiceProviderModel_1.default.aggregate([
                { $match: { _id: new mongoose_2.Types.ObjectId(providerId) } },
                { $unwind: "$subscription" },
                {
                    $lookup: {
                        from: "subscriptionplans",
                        localField: "subscription.planId",
                        foreignField: "_id",
                        as: "planDetails",
                    },
                },
                { $unwind: "$planDetails" },
                {
                    $project: {
                        _id: "$subscription._id",
                        startDate: "$subscription.startDate",
                        endDate: "$subscription.endDate",
                        status: "$subscription.status",
                        paymentId: "$subscription.paymentId",
                        name: "$planDetails.name",
                        price: "$planDetails.price",
                        validityDays: "$planDetails.validityDays",
                        leftDays: {
                            $ceil: {
                                $divide: [
                                    { $subtract: ["$subscription.endDate", now] },
                                    1000 * 60 * 60 * 24,
                                ],
                            },
                        },
                    },
                },
            ]);
            const activeSubscription = result.find((sub) => sub.status === "active" &&
                new Date(sub.startDate) <= now &&
                new Date(sub.endDate) >= now);
            const expiredSubscriptions = result.filter((sub) => !(sub.status === "active" &&
                new Date(sub.startDate) <= now &&
                new Date(sub.endDate) >= now));
            return {
                activeSubscription: activeSubscription || null,
                expiredSubscriptions,
            };
        });
    }
    blockService(ProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield ServiceProviderModel_1.default.updateOne({ _id: ProviderId }, { $set: { isBlocked: true } });
                return result.modifiedCount > 0;
            }
            catch (error) {
                throw error;
            }
        });
    }
    unblockService(ProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield ServiceProviderModel_1.default.updateOne({ _id: ProviderId }, { $set: { isBlocked: false } });
                return result.modifiedCount > 0;
            }
            catch (error) {
                throw error;
            }
        });
    }
    editProvider(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data._id) {
                throw new Error("Provider ID is required to edit provider.");
            }
            const existingProvider = yield this.findById(data._id + "");
            if (!existingProvider) {
                throw new Error("Service Provider not found.");
            }
            const isUnchanged = Object.keys(data).every((key) => {
                // @ts-ignore
                return data[key] === existingProvider[key];
            });
            if (isUnchanged) {
                return true;
            }
            yield ServiceProviderModel_1.default.findByIdAndUpdate(data._id, data, { new: true });
            return true;
        });
    }
    addSubscription(providerId, subscription) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceProviderModel_1.default.findByIdAndUpdate(providerId, {
                $push: {
                    subscription: {
                        planId: subscription.planId,
                        startDate: subscription.startDate,
                        endDate: subscription.endDate,
                        status: subscription.status,
                        paymentId: subscription.paymentId,
                        createdAt: new Date(),
                    },
                },
            }, { new: true });
        });
    }
    expireSubscriptions() {
        return __awaiter(this, void 0, void 0, function* () {
            const today = new Date();
            const result = yield ServiceProviderModel_1.default.updateMany({
                subscription: { $exists: true, $ne: [] },
                "subscription.status": "active",
                "subscription.endDate": { $lt: today },
            }, {
                $set: { "subscription.$[elem].status": "inactive" },
            }, {
                arrayFilters: [
                    {
                        "elem.status": "active",
                        "elem.endDate": { $lt: today },
                    },
                ],
            });
            return result.modifiedCount;
        });
    }
    findLatestActiveSubscription(providerIdString) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, mongoose_1.isValidObjectId)(providerIdString)) {
                console.error("Invalid serviceProviderId:", providerIdString);
                return null;
            }
            const providerId = new mongoose_1.default.Types.ObjectId(providerIdString);
            const provider = yield ServiceProviderModel_1.default.findOne({
                _id: providerId,
                subscription: {
                    $elemMatch: {
                        startDate: { $lte: new Date() },
                        endDate: { $gte: new Date() },
                        status: "active",
                    },
                },
            }, { subscription: 1 });
            if (!provider || !provider.subscription) {
                return null;
            }
            const activeSubs = provider.subscription.filter((s) => s.status === "active" &&
                s.startDate <= new Date() &&
                s.endDate >= new Date());
            if (activeSubs.length === 0) {
                return null;
            }
            return activeSubs.reduce((latest, sub) => sub.endDate > latest.endDate ? sub : latest);
        });
    }
    findLatestSubscription(providerIdString) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(0, mongoose_1.isValidObjectId)(providerIdString)) {
                console.error("Invalid serviceProviderId:", providerIdString);
                return null;
            }
            const providerId = new mongoose_1.default.Types.ObjectId(providerIdString);
            const [result] = yield ServiceProviderModel_1.default.aggregate([
                { $match: { _id: providerId } },
                {
                    $project: {
                        latestSubscription: {
                            $first: {
                                $filter: {
                                    input: {
                                        $sortArray: {
                                            input: "$subscription",
                                            sortBy: { endDate: -1 },
                                        },
                                    },
                                    as: "sub",
                                    cond: {
                                        $in: ["$$sub.status", ["active", "pending"]],
                                    },
                                },
                            },
                        },
                    },
                },
            ]);
            return (result === null || result === void 0 ? void 0 : result.latestSubscription) || null;
        });
    }
    findRegistrationDetailsByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceProviderModel_1.default.findOne({
                userId: new mongoose_2.Types.ObjectId(userId),
            })
                .select(`
        serviceProviderName
        serviceProviderPhone
        serviceProviderEmail
        experience
        serviceMode
        services
        skills
        description
        location
        profileImage
        documentImg
        documentImg2
        bankDetails
        SocialMedia
        isVerified
        document
        `)
                .lean();
        });
    }
    findStatusByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield ServiceProviderModel_1.default.findOne({ userId })
                .select("isVerified")
                .lean();
            if (!provider || !provider.isVerified) {
                return null;
            }
            return {
                isVerified: provider.isVerified,
            };
        });
    }
    updateRegistration(serviceProviderId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedProvider = yield ServiceProviderModel_1.default.findByIdAndUpdate(serviceProviderId, {
                $set: data,
            }, {
                new: true,
                runValidators: true,
            });
            if (!updatedProvider) {
                throw new Error("Service provider not found");
            }
            return updatedProvider;
        });
    }
    findUserIdByProviderId(providerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = yield ServiceProviderModel_1.default.findById(providerId)
                .select("userId")
                .lean();
            if (!provider) {
                throw new Error(`ServiceProvider not found: ${providerId}`);
            }
            return provider.userId.toString();
        });
    }
};
exports.ServiceProviderRepository = ServiceProviderRepository;
exports.ServiceProviderRepository = ServiceProviderRepository = __decorate([
    (0, tsyringe_1.injectable)()
], ServiceProviderRepository);
