"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.AdRepository = void 0;
const tsyringe_1 = require("tsyringe");
const AdModel_1 = require("../models/AdModel");
const mongoose_1 = require("mongoose");
const errorUtils_1 = require("../../utils/errorUtils");
let AdRepository = class AdRepository {
    createAd(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ad = yield AdModel_1.AdModel.create(data);
                return ad.toObject();
            }
            catch (e) {
                console.log((0, errorUtils_1.getErrorMessage)(e));
                throw e;
            }
        });
    }
    findAllAdsWithProvider(skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const ads = yield AdModel_1.AdModel.aggregate([
                { $sort: { createdAt: -1 } },
                { $skip: skip },
                { $limit: limit },
                {
                    $lookup: {
                        from: "serviceproviders",
                        localField: "providerId",
                        foreignField: "_id",
                        as: "provider",
                    },
                },
                {
                    $unwind: {
                        path: "$provider",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $project: {
                        _id: 1,
                        serviceId: 1,
                        providerId: 1,
                        serviceProviderName: "$provider.serviceProviderName",
                        profileImage: "$provider.profileImage",
                        caption: 1,
                        description: 1,
                        image: 1,
                        targetLocation: 1,
                        radiusKm: 1,
                        startDate: 1,
                        endDate: 1,
                        views: 1,
                        clicks: 1,
                        status: 1,
                        createdAt: 1,
                        updatedAt: 1,
                    },
                },
            ]);
            return ads;
        });
    }
    getTotalAdCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return AdModel_1.AdModel.countDocuments();
        });
    }
    getTotalProviderAdCount(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = new mongoose_1.Types.ObjectId(id);
            return AdModel_1.AdModel.find({ providerId: _id }).countDocuments();
        });
    }
    changeAdStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const adId = new mongoose_1.Types.ObjectId(id);
                const result = yield AdModel_1.AdModel.updateOne({ _id: adId }, { $set: { status } });
                return result.modifiedCount > 0;
            }
            catch (error) {
                console.log((0, errorUtils_1.getErrorMessage)(error));
                return false;
            }
        });
    }
    getAdsByProvider(providerId_1) {
        return __awaiter(this, arguments, void 0, function* (providerId, skip = 0, limit = 10) {
            try {
                const id = new mongoose_1.Types.ObjectId(providerId);
                return yield AdModel_1.AdModel.find({ providerId: id })
                    .sort({ createdAt: -1 })
                    .skip(skip)
                    .limit(limit).lean();
            }
            catch (error) {
                console.log((0, errorUtils_1.getErrorMessage)(error));
                throw error;
            }
        });
    }
    // async findRecommendedAds(
    //   params: IGetRecommendedAdsRequestDTO
    // ): Promise<IRecommendedAdDTO[]> {
    //   const {
    //     count = 4,
    //     category,
    //     providerId,
    //     lat,
    //     lng,
    //     radius = 10000,
    //   } = params;
    //   return await AdModel.find({}).limit(count).lean()
    // }
    // async findRecommendedAds(
    //   params: IGetRecommendedAdsRequestDTO
    // ): Promise<IRecommendedAdDTO[]> {
    //   const {
    //     count = 3,
    //     category,
    //     providerId,
    //     lat,
    //     lng,
    //     radius = 10000,
    //   } = params;
    //   const now = new Date();
    //   const match: any = {
    //     status: "active",
    //     startDate: { $lte: now },
    //     endDate: { $gte: now },
    //   };
    //   if (category) match.category = category;
    //   if (providerId) match.providerId = providerId;
    //   let coords: [number, number] | null = null;
    //   if (lat !== undefined && lng !== undefined) {
    //     coords = [lng, lat];
    //   }
    //   const ads = await AdModel.aggregate([
    //     ...(coords
    //       ? [
    //           {
    //             $geoNear: {
    //               near: coords,
    //               distanceField: "distance",
    //               maxDistance: radius * 1000,
    //               spherical: true,
    //             },
    //           },
    //         ]
    //       : []),
    //     { $match: match },
    //     { $sort: { boostScore: -1, createdAt: -1 } },
    //     { $sample: { size: count } },
    //     {
    //       $lookup: {
    //         from: "serviceproviders",
    //         localField: "providerId",
    //         foreignField: "_id",
    //         as: "provider",
    //         pipeline: [
    //           {
    //             $match: {
    //               subscriptions: {
    //                 $elemMatch: {
    //                   startDate: { $lte: new Date() },
    //                   endDate: { $gte: new Date() },
    //                   status: "active",
    //                 },
    //               },
    //             },
    //           },
    //         ],
    //       },
    //     },
    //     { $match: { provider: { $ne: [] } } },
    //     {
    //       $unwind: {
    //         path: "$provider",
    //         preserveNullAndEmptyArrays: false,
    //       },
    //     },
    //     {
    //       $project: {
    //         _id: { $toString: "$_id" },
    //         serviceId: { $toString: "$serviceId" },
    //         providerId: { $toString: "$providerId" },
    //         serviceProviderName: "$provider.name",
    //         profileImage: "$provider.profileImage",
    //         caption: 1,
    //         description: 1,
    //         image: 1,
    //       },
    //     },
    //     { $limit: count },
    //   ]);
    //   const adIds = ads.map((a) => a._id);
    //   if (adIds.length > 0) {
    //     await AdModel.updateMany({ _id: { $in: adIds } }, { $inc: { views: 1 } });
    //   }
    //   return ads as IRecommendedAdDTO[];
    // }
    findRecommendedAds(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const { count = 3, category, providerId } = params;
            const now = new Date();
            const startOfTodayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0, 0));
            const endOfTodayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 23, 59, 59, 999));
            const match = {
                status: "active",
                startDate: { $lte: endOfTodayUTC },
                endDate: { $gte: startOfTodayUTC },
            };
            if (category)
                match.category = category;
            if (providerId)
                match.providerId = providerId;
            const ads = yield AdModel_1.AdModel.aggregate([
                { $match: match },
                {
                    $lookup: {
                        from: "serviceproviders",
                        localField: "providerId",
                        foreignField: "_id",
                        as: "provider"
                    }
                },
                { $unwind: "$provider" },
                { $sample: { size: count } },
                {
                    $project: {
                        _id: { $toString: "$_id" },
                        serviceId: { $toString: "$serviceId" },
                        providerId: { $toString: "$providerId" },
                        serviceProviderName: "$provider.name",
                        profileImage: "$provider.profileImage",
                        caption: 1,
                        description: 1,
                        image: 1
                    }
                }
            ]);
            return ads;
        });
    }
    expireExpiredAds() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const now = new Date();
            const result = yield AdModel_1.AdModel.updateMany({
                status: "active",
                endDate: { $lt: now },
            }, {
                $set: { status: "expired" },
            });
            return (_a = result.modifiedCount) !== null && _a !== void 0 ? _a : 0;
        });
    }
    updateAd(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AdModel_1.AdModel.findByIdAndUpdate(id, data, { new: true });
        });
    }
    getAdById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AdModel_1.AdModel.findById(id);
        });
    }
    blockAd(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield AdModel_1.AdModel.updateOne({ _id: id }, { status: "blocked" });
            return result.modifiedCount > 0;
        });
    }
    unblockAd(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield AdModel_1.AdModel.updateOne({ _id: id }, { status: "approved" });
            return result.modifiedCount > 0;
        });
    }
    expireAd(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield AdModel_1.AdModel.updateOne({ _id: id }, { status: "expired" });
            return result.modifiedCount > 0;
        });
    }
    incrementClicks(adId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const updated = yield AdModel_1.AdModel.findByIdAndUpdate(adId, { $inc: { clicks: 1 } }, { new: true });
            return (_a = updated === null || updated === void 0 ? void 0 : updated.clicks) !== null && _a !== void 0 ? _a : 0;
        });
    }
};
exports.AdRepository = AdRepository;
exports.AdRepository = AdRepository = __decorate([
    (0, tsyringe_1.injectable)()
], AdRepository);
