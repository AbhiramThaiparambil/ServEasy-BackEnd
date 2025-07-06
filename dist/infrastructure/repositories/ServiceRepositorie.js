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
exports.ServiceRepository = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const ServiceModel_1 = __importDefault(require("../models/ServiceModel"));
const tsyringe_1 = require("tsyringe");
let ServiceRepository = class ServiceRepository {
    create(service) {
        return __awaiter(this, void 0, void 0, function* () {
            const newService = new ServiceModel_1.default(service);
            return yield newService.save();
        });
    }
    findById(serviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceModel_1.default.findById(serviceId);
        });
    }
    findAllServiceProviderId(serviceProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceModel_1.default.find({
                serviceProviderId: serviceProviderId,
            }).exec();
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceModel_1.default.find();
        });
    }
    update(serviceId, service) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceModel_1.default.findByIdAndUpdate(serviceId, service, {
                new: true,
            });
        });
    }
    delete(serviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield ServiceModel_1.default.findByIdAndDelete(serviceId);
            return !!result;
        });
    }
    blockService(serviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield ServiceModel_1.default.updateOne({ _id: serviceId }, { $set: { isActive: false } });
                return result.modifiedCount > 0;
            }
            catch (error) {
                throw error;
            }
        });
    }
    unblockService(serviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield ServiceModel_1.default.updateOne({ _id: serviceId }, { $set: { isActive: true } });
                return result.modifiedCount > 0;
            }
            catch (error) {
                throw error;
            }
        });
    }
    updateService(id, newData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ServiceModel_1.default.findOneAndReplace({ _id: id }, newData, { new: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    // async getServicesWithProviderDetails() {
    //   return await ServiceModel.aggregate([
    //     {
    //       $lookup: {
    //         from: "serviceproviders",
    //         localField: "serviceProviderId",
    //         foreignField: "_id",
    //         as: "serviceProviderDetails"
    //       }
    //     }
    //   ]);
    // }
    getServicesWithProviderDetails(skip, limit, search) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceModel_1.default.aggregate([
                {
                    $match: {
                        $or: [
                            { serviceName: { $regex: search, $options: "i" } },
                            { description: { $regex: search, $options: "i" } }
                        ]
                    }
                },
                {
                    $lookup: {
                        from: "serviceproviders",
                        localField: "serviceProviderId",
                        foreignField: "_id",
                        as: "serviceProviderDetails"
                    }
                },
                {
                    $unwind: {
                        path: "$serviceProviderDetails",
                        preserveNullAndEmptyArrays: true
                    }
                },
                { $skip: skip },
                { $limit: limit }
            ]);
        });
    }
    getServicesWithProviderDetailsCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceModel_1.default.countDocuments();
        });
    }
    getSingleServiceWithProviderDetails(serviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceModel_1.default.aggregate([
                {
                    $match: { _id: new mongoose_1.default.Types.ObjectId(serviceId) }
                },
                {
                    $lookup: {
                        from: "reviews",
                        let: { serviceId: "$_id" },
                        pipeline: [
                            {
                                $match: {
                                    $expr: { $eq: ["$serviceId", "$$serviceId"] }
                                }
                            },
                            {
                                $group: {
                                    _id: null,
                                    avgRating: { $avg: "$rating" },
                                    totalReviews: { $sum: 1 }
                                }
                            }
                        ],
                        as: "reviewDetails"
                    }
                },
                {
                    $unwind: {
                        path: "$reviewDetails",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $lookup: {
                        from: "serviceproviders",
                        localField: "serviceProviderId",
                        foreignField: "_id",
                        as: "serviceProviderDetails"
                    }
                },
                {
                    $unwind: {
                        path: "$serviceProviderDetails",
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $limit: 1
                }
            ]);
        });
    }
    findAllActiveServices() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceModel_1.default.find({ isActive: true });
        });
    }
    //   async findAllActiveServicesUser(): Promise<any> {
    // return await ServiceModel.aggregate([
    //     {
    //       $match: {
    //         isActive: true,
    //       },
    //     },
    //     {
    //       $lookup: {
    //         from: 'categories', 
    //         localField: 'category',
    //         foreignField: '_id',
    //         as: 'categoryInfo',
    //       },
    //     },
    //     {
    //       $unwind: {
    //         path: '$categoryInfo',
    //         preserveNullAndEmptyArrays: true,
    //       },
    //     },
    //     {
    //       $lookup: {
    //         from: 'serviceproviders',
    //         localField: 'serviceProviderId',
    //         foreignField: '_id',
    //         as: 'providerInfo',
    //       },
    //     },
    //     {
    //       $unwind: {
    //         path: '$providerInfo',
    //         preserveNullAndEmptyArrays: true,
    //       },
    //     },
    //     {
    //       $project: {
    //         serviceProviderName: '$providerInfo.serviceProviderName',
    //         profileImage: '$providerInfo.profileImage',
    //         category: '$categoryInfo.category',
    //         serviceName: 1,
    //         description: 1,
    //         serviceType: 1,
    //         location: 1,
    //         estimatedPrice: 1,
    //         serviceImage: 1,
    //         createdAt: 1,
    //         distance: 1,
    //       },
    //     },
    //   ]);
    //   }
    findAllActiveServicesUser(limit, cursor) {
        return __awaiter(this, void 0, void 0, function* () {
            const matchStage = {
                isActive: true,
            };
            if (cursor) {
                matchStage._id = { $gt: new mongoose_1.Types.ObjectId(cursor) };
            }
            const pipeline = [
                {
                    $match: matchStage,
                },
                {
                    $sort: { _id: 1 },
                },
                {
                    $limit: limit,
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "category",
                        foreignField: "_id",
                        as: "categoryInfo",
                    },
                },
                {
                    $unwind: {
                        path: "$categoryInfo",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $lookup: {
                        from: "serviceproviders",
                        localField: "serviceProviderId",
                        foreignField: "_id",
                        as: "providerInfo",
                    },
                },
                {
                    $unwind: {
                        path: "$providerInfo",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $project: {
                        serviceProviderName: "$providerInfo.serviceProviderName",
                        profileImage: "$providerInfo.profileImage",
                        category: "$categoryInfo.category",
                        serviceName: 1,
                        description: 1,
                        serviceType: 1,
                        location: 1,
                        estimatedPrice: 1,
                        serviceImage: 1,
                        createdAt: 1,
                        distance: 1,
                    },
                },
            ];
            const services = yield ServiceModel_1.default.aggregate(pipeline);
            const nextCursor = services.length > 0 ? services[services.length - 1]._id.toString() : null;
            return { services, nextCursor };
        });
    }
    // async  findNearestServices(
    //   userLongitude: number,
    //   userLatitude: number,
    //   serviceProviderId?: Types.ObjectId |string
    // ) {
    //   const maxDistanceInMeters = 5000;
    //   return await ServiceModel.aggregate([
    //     {
    //       $geoNear: {
    //         near: {
    //           type: 'Point',
    //           coordinates: [userLongitude, userLatitude],
    //         },
    //         distanceField: 'distance',
    //         spherical: true,
    //         maxDistance: maxDistanceInMeters,
    //       },
    //     },
    //     {
    //       $match: {
    //         isActive: true,
    //         serviceProviderId: { $ne: serviceProviderId }, // Exclude the current provider if needed
    //       },
    //     },
    //     {
    //       $lookup: {
    //         from: 'categories', 
    //         localField: 'category',
    //         foreignField: '_id',
    //         as: 'categoryInfo',
    //       },
    //     },
    //     {
    //       $unwind: {
    //         path: '$categoryInfo',
    //         preserveNullAndEmptyArrays: true,
    //       },
    //     },
    //     {
    //       $lookup: {
    //         from: 'serviceproviders',
    //         localField: 'serviceProviderId',
    //         foreignField: '_id',
    //         as: 'providerInfo',
    //       },
    //     },
    //     {
    //       $unwind: {
    //         path: '$providerInfo',
    //         preserveNullAndEmptyArrays: true,
    //       },
    //     },
    //     {
    //       $project: {
    //         serviceProviderName: '$providerInfo.serviceProviderName',
    //         profileImage: '$providerInfo.profileImage',
    //         category: '$categoryInfo.category',
    //         serviceName: 1,
    //         description: 1,
    //         serviceType: 1,
    //         location: 1,
    //         estimatedPrice: 1,
    //         serviceImage: 1,
    //         createdAt: 1,
    //         distance: 1,
    //       },
    //     },
    //   ]);
    // }
    // async findNearestServices(
    //   userLongitude: number,
    //   userLatitude: number,
    //   serviceProviderId?: Types.ObjectId | string,
    //   limit: number = 10,
    //   cursor?: string | null
    // ) {
    //   const maxDistanceInMeters = 5000;
    //   const matchStage: any = {
    //     isActive: true,
    //     serviceProviderId: { $ne: new Types.ObjectId(serviceProviderId) }
    //   };
    //   if (cursor) {
    //     matchStage._id = { $gt: new Types.ObjectId(cursor) };
    //   }
    //   const services = await ServiceModel.aggregate([
    //     {
    //       $geoNear: {
    //         near: {
    //           type: 'Point',
    //           coordinates: [userLongitude, userLatitude],
    //         },
    //         distanceField: 'distance',
    //         spherical: true,
    //         maxDistance: maxDistanceInMeters,
    //       },
    //     },
    //     { $match: matchStage },
    //     {
    //       $lookup: {
    //         from: 'categories',
    //         localField: 'category',
    //         foreignField: '_id',
    //         as: 'categoryInfo',
    //       },
    //     },
    //     {
    //       $unwind: {
    //         path: '$categoryInfo',
    //         preserveNullAndEmptyArrays: true,
    //       },
    //     },
    //     {
    //       $lookup: {
    //         from: 'serviceproviders',
    //         localField: 'serviceProviderId',
    //         foreignField: '_id',
    //         as: 'providerInfo',
    //       },
    //     },
    //     {
    //       $unwind: {
    //         path: '$providerInfo',
    //         preserveNullAndEmptyArrays: true,
    //       },
    //     },
    //     {
    //       $project: {
    //         serviceProviderName: '$providerInfo.serviceProviderName',
    //         profileImage: '$providerInfo.profileImage',
    //         category: '$categoryInfo.category',
    //         serviceName: 1,
    //         description: 1,
    //         serviceType: 1,
    //         location: 1,
    //         estimatedPrice: 1,
    //         serviceImage: 1,
    //         createdAt: 1,
    //         distance: 1,
    //       },
    //     },
    //     { $sort: { _id: 1 } },
    //     { $limit: limit },
    //   ]);
    //   const nextCursor =
    //     services.length > 0 ? services[services.length - 1]._id.toString() : null;
    //   return { services, nextCursor };
    // }
    findNearestServicesFilterCatogory(userLongitude_1, userLatitude_1, category_1, serviceProviderId_1) {
        return __awaiter(this, arguments, void 0, function* (userLongitude, userLatitude, category, serviceProviderId, limit = 10, cursor) {
            const maxDistanceInMeters = 5000;
            const matchStage = {
                isActive: true,
                serviceProviderId: { $ne: new mongoose_1.Types.ObjectId(serviceProviderId) }
            };
            if (cursor) {
                matchStage._id = { $gt: new mongoose_1.Types.ObjectId(cursor) };
            }
            const services = yield ServiceModel_1.default.aggregate([
                {
                    $geoNear: {
                        near: {
                            type: 'Point',
                            coordinates: [userLongitude, userLatitude],
                        },
                        distanceField: 'distance',
                        spherical: true,
                        maxDistance: maxDistanceInMeters,
                    },
                },
                { $match: matchStage },
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'category',
                        foreignField: '_id',
                        as: 'categoryInfo',
                    },
                },
                {
                    $unwind: {
                        path: '$categoryInfo',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    // 👇 Filter by category name here
                    $match: {
                        'categoryInfo.category': category,
                    },
                },
                {
                    $lookup: {
                        from: 'serviceproviders',
                        localField: 'serviceProviderId',
                        foreignField: '_id',
                        as: 'providerInfo',
                    },
                },
                {
                    $unwind: {
                        path: '$providerInfo',
                        preserveNullAndEmptyArrays: true,
                    },
                },
                {
                    $project: {
                        serviceProviderName: '$providerInfo.serviceProviderName',
                        profileImage: '$providerInfo.profileImage',
                        category: '$categoryInfo.category',
                        experience: '$providerInfo.experience',
                        serviceName: 1,
                        description: 1,
                        serviceType: 1,
                        location: 1,
                        estimatedPrice: 1,
                        serviceImage: 1,
                        createdAt: 1,
                        distance: 1,
                    },
                },
                { $sort: { _id: 1 } },
                { $limit: limit },
            ]);
            const nextCursor = services.length > 0 ? services[services.length - 1]._id.toString() : null;
            return { services, nextCursor };
        });
    }
    // async findNearestServicesFilterServiceProviderExpirance(
    //   userLongitude: number,
    //   userLatitude: number,
    //   category: string,
    //   experience: number,
    //   serviceProviderId?: Types.ObjectId | string,
    //   limit: number = 10,
    //   cursor?: string | null
    // ) {
    //   const maxDistanceInMeters = 5000;
    //   const matchStage: any = {
    //     isActive: true,
    //     serviceProviderId: { $ne: new Types.ObjectId(serviceProviderId) },
    //   };
    //   if (cursor) {
    //     matchStage._id = { $gt: new Types.ObjectId(cursor) };
    //   }
    //   const services = await ServiceModel.aggregate([
    //     {
    //       $geoNear: {
    //         near: {
    //           type: 'Point',
    //           coordinates: [userLongitude, userLatitude],
    //         },
    //         distanceField: 'distance',
    //         spherical: true,
    //         maxDistance: maxDistanceInMeters,
    //       },
    //     },
    //     { $match: matchStage },
    //     {
    //       $lookup: {
    //         from: 'categories',
    //         localField: 'category',
    //         foreignField: '_id',
    //         as: 'categoryInfo',
    //       },
    //     },
    //     {
    //       $unwind: {
    //         path: '$categoryInfo',
    //         preserveNullAndEmptyArrays: true,
    //       },
    //     },
    //     {
    //       $match: {
    //         'categoryInfo.category': category,
    //       },
    //     },
    //     {
    //       $lookup: {
    //         from: 'serviceproviders',
    //         localField: 'serviceProviderId',
    //         foreignField: '_id',
    //         as: 'providerInfo',
    //       },
    //     },
    //     {
    //       $unwind: {
    //         path: '$providerInfo',
    //         preserveNullAndEmptyArrays: true,
    //       },
    //     },
    //     {
    //       // 👇 Filter by experience >= given experience
    //       $match: {
    //         'providerInfo.experience': { $gte: experience },
    //       },
    //     },
    //     {
    //       $project: {
    //         serviceProviderName: '$providerInfo.serviceProviderName',
    //         profileImage: '$providerInfo.profileImage',
    //         category: '$categoryInfo.category',
    //         experience: '$providerInfo.experience',
    //         serviceName: 1,
    //         description: 1,
    //         serviceType: 1,
    //         location: 1,
    //         estimatedPrice: 1,
    //         serviceImage: 1,
    //         createdAt: 1,
    //         distance: 1,
    //       },
    //     },
    //     { $sort: { _id: 1 } },
    //     { $limit: limit },
    //   ]);
    //   const nextCursor =
    //     services.length > 0 ? services[services.length - 1]._id.toString() : null;
    //   return { services, nextCursor };
    // }
    // async findNearestServicesFilter(
    //   userLongitude: number,
    //   userLatitude: number,
    //   category?: string,
    //   experience?: number,
    //   priceSort?: "gtToLow" | "lowTogt",
    //   searchQuery?: string,
    //   serviceProviderId?: Types.ObjectId | string,
    //   limit: number = 10,
    //   cursor?: string | null
    // ) {
    //   const maxDistanceInMeters = 5000;
    //   const matchStage: any = {
    //     isActive: true,
    //     serviceProviderId: { $ne: new Types.ObjectId(serviceProviderId) },
    //   };
    //   if (cursor) {
    //     matchStage._id = { $gt: new Types.ObjectId(cursor) };
    //   }
    //   const pipeline: any[] = [
    //     {
    //       $geoNear: {
    //         near: {
    //           type: 'Point',
    //           coordinates: [userLongitude, userLatitude],
    //         },
    //         distanceField: 'distance',
    //         spherical: true,
    //         maxDistance: maxDistanceInMeters,
    //       },
    //     },
    //     { $match: matchStage },
    //     {
    //       $lookup: {
    //         from: 'categories',
    //         localField: 'category',
    //         foreignField: '_id',
    //         as: 'categoryInfo',
    //       },
    //     },
    //     {
    //       $unwind: {
    //         path: '$categoryInfo',
    //         preserveNullAndEmptyArrays: true,
    //       },
    //     },
    //   ];
    //   // Optional category filter
    //   if (category) {
    //     pipeline.push({
    //       $match: { 'categoryInfo.category': category },
    //     });
    //   }
    //   // Lookup for service provider info
    //   pipeline.push(
    //     {
    //       $lookup: {
    //         from: 'serviceproviders',
    //         localField: 'serviceProviderId',
    //         foreignField: '_id',
    //         as: 'providerInfo',
    //       },
    //     },
    //     {
    //       $unwind: {
    //         path: '$providerInfo',
    //         preserveNullAndEmptyArrays: true,
    //       },
    //     }
    //   );
    //   // Optional experience filter
    //   if (experience !== undefined) {
    //     pipeline.push({
    //       $match: {
    //         'providerInfo.experience': { $gte: experience },
    //       },
    //     });
    //   }
    //   // Optional search query filter on serviceName
    //   if (searchQuery) {
    //     pipeline.push({
    //       $match: {
    //         serviceName: { $regex: searchQuery, $options: 'i' },
    //       },
    //     });
    //   }
    //   // Projection
    //   pipeline.push({
    //     $project: {
    //       serviceProviderName: '$providerInfo.serviceProviderName',
    //       profileImage: '$providerInfo.profileImage',
    //       category: '$categoryInfo.category',
    //       experience: '$providerInfo.experience',
    //       serviceName: 1,
    //       description: 1,
    //       serviceType: 1,
    //       location: 1,
    //       estimatedPrice: 1,
    //       serviceImage: 1,
    //       createdAt: 1,
    //       distance: 1,
    //     },
    //   });
    //   // Price sort logic
    //   if (priceSort === 'gtToLow') {
    //     pipeline.push({ $sort: { estimatedPrice: -1 } });
    //   } else if (priceSort === 'lowTogt') {
    //     pipeline.push({ $sort: { estimatedPrice: 1 } });
    //   } else {
    //     pipeline.push({ $sort: { _id: 1 } }); // fallback/default sort
    //   }
    //   // Pagination
    //   pipeline.push({ $limit: limit });
    //   const services = await ServiceModel.aggregate(pipeline);
    //   const nextCursor =
    //     services.length > 0 ? services[services.length - 1]._id.toString() : null;
    //   return { services, nextCursor };
    // }
    // async findNearestServicesFilter(
    //   userLongitude?: number | null,
    //   userLatitude?: number | null,
    //   filters?: {
    //     category?: string;
    //     experience?: number;
    //     priceSort?: "gtToLow" | "lowTogt";
    //     searchQuery?: string;
    //   },
    //   limit: number = 10,
    //   cursor?: string | null
    // ) {
    //   const maxDistanceInMeters = 5000;
    //   const pipeline: any[] = [];
    //   // 1. Sorting logic
    //   let sortStage: Record<string, 1 | -1> = { _id: 1 };
    //   if (filters?.priceSort === "gtToLow") {
    //     sortStage = { estimatedPrice: -1, _id: 1 };
    //   } else if (filters?.priceSort === "lowTogt") {
    //     sortStage = { estimatedPrice: 1, _id: 1 };
    //   }
    //   // 2. geoNear (if location)
    //   if (userLongitude != null && userLatitude != null) {
    //     pipeline.push({
    //       $geoNear: {
    //         near: { type: "Point", coordinates: [userLongitude, userLatitude] },
    //         distanceField: "distance",
    //         spherical: true,
    //         maxDistance: maxDistanceInMeters,
    //         query: { isActive: true }, // apply isActive here
    //       },
    //     });
    //   } else {
    //     pipeline.push({ $match: { isActive: true } });
    //   }
    //   // 3. Sorting comes BEFORE cursor match
    //   pipeline.push({ $sort: sortStage });
    //   // 4. Cursor filtering (AFTER sort)
    //   if (cursor) {
    //     if (filters?.priceSort) {
    //       const [priceStr, idStr] = cursor.split("_");
    //       const price = parseFloat(priceStr);
    //       const id = new Types.ObjectId(idStr);
    //       pipeline.push({
    //         $match: {
    //           $or: [
    //             { estimatedPrice: { [sortStage.estimatedPrice === 1 ? "$gt" : "$lt"]: price } },
    //             {
    //               estimatedPrice: price,
    //               _id: { $gt: id },
    //             },
    //           ],
    //         },
    //       });
    //     } else {
    //       pipeline.push({
    //         $match: { _id: { $gt: new Types.ObjectId(cursor) } },
    //       });
    //     }
    //   }
    //   // 5. Lookups and filters
    //   pipeline.push(
    //     {
    //       $lookup: {
    //         from: "categories",
    //         localField: "category",
    //         foreignField: "_id",
    //         as: "categoryInfo",
    //       },
    //     },
    //     {
    //       $unwind: {
    //         path: "$categoryInfo",
    //         preserveNullAndEmptyArrays: true,
    //       },
    //     }
    //   );
    //   if (filters?.category) {
    //     pipeline.push({
    //       $match: { "categoryInfo.category": filters.category },
    //     });
    //   }
    //   pipeline.push(
    //     {
    //       $lookup: {
    //         from: "serviceproviders",
    //         localField: "serviceProviderId",
    //         foreignField: "_id",
    //         as: "providerInfo",
    //       },
    //     },
    //     {
    //       $unwind: {
    //         path: "$providerInfo",
    //         preserveNullAndEmptyArrays: true,
    //       },
    //     }
    //   );
    //   if (filters?.experience !== undefined) {
    //     pipeline.push({
    //       $match: { "providerInfo.experience": { $gte: filters.experience } },
    //     });
    //   }
    //   if (filters?.searchQuery) {
    //     pipeline.push({
    //       $match: {
    //         serviceName: { $regex: filters.searchQuery, $options: "i" },
    //       },
    //     });
    //   }
    //   // 6. Final projection
    //   pipeline.push({
    //     $project: {
    //       serviceProviderName: "$providerInfo.serviceProviderName",
    //       profileImage: "$providerInfo.profileImage",
    //       category: "$categoryInfo.category",
    //       experience: "$providerInfo.experience",
    //       serviceName: 1,
    //       description: 1,
    //       serviceType: 1,
    //       location: 1,
    //       estimatedPrice: 1,
    //       serviceImage: 1,
    //       createdAt: 1,
    //       distance: 1,
    //     },
    //   });
    //   // 7. Apply limit
    //   pipeline.push({ $limit: limit });
    //   // 8. Fetch
    //   const services = await ServiceModel.aggregate(pipeline);
    //   // 9. Build nextCursor
    //   let nextCursor = null;
    //   if (services.length > 0) {
    //     const last = services[services.length - 1];
    //     nextCursor = filters?.priceSort
    //       ? `${last.estimatedPrice}_${last._id.toString()}`
    //       : last._id.toString();
    //   }
    //   return { services, nextCursor };
    // }
    findNearestServicesFilter(userLongitude_1, userLatitude_1, filters_1) {
        return __awaiter(this, arguments, void 0, function* (userLongitude, userLatitude, filters, limit = 10, cursor) {
            const maxDistanceInMeters = 5000;
            const pipeline = [];
            // 1. Sorting logic (consistent direction)
            let sortDirection = 1;
            let sortStage = { _id: 1 };
            if ((filters === null || filters === void 0 ? void 0 : filters.priceSort) === "gtToLow") {
                sortDirection = -1;
                sortStage = { estimatedPrice: -1, _id: -1 };
            }
            else if ((filters === null || filters === void 0 ? void 0 : filters.priceSort) === "lowTogt") {
                sortDirection = 1;
                sortStage = { estimatedPrice: 1, _id: 1 };
            }
            if (userLongitude != null && userLatitude != null) {
                pipeline.push({
                    $geoNear: {
                        near: { type: "Point", coordinates: [userLongitude, userLatitude] },
                        distanceField: "distance",
                        spherical: true,
                        maxDistance: maxDistanceInMeters,
                        query: { isActive: true },
                    },
                });
            }
            else {
                pipeline.push({ $match: { isActive: true } });
            }
            pipeline.push({ $sort: sortStage });
            if (cursor) {
                if (filters === null || filters === void 0 ? void 0 : filters.priceSort) {
                    const [priceStr, idStr] = cursor.split("_");
                    const price = parseFloat(priceStr);
                    const id = new mongoose_1.Types.ObjectId(idStr);
                    pipeline.push({
                        $match: {
                            $or: [
                                { estimatedPrice: { [sortDirection === 1 ? "$gt" : "$lt"]: price } },
                                {
                                    estimatedPrice: price,
                                    _id: { [sortDirection === 1 ? "$gt" : "$lt"]: id },
                                },
                            ],
                        },
                    });
                }
                else {
                    pipeline.push({
                        $match: { _id: { $gt: new mongoose_1.Types.ObjectId(cursor) } },
                    });
                }
            }
            pipeline.push({
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "categoryInfo",
                },
            }, {
                $unwind: {
                    path: "$categoryInfo",
                    preserveNullAndEmptyArrays: true,
                },
            });
            if (filters === null || filters === void 0 ? void 0 : filters.category) {
                pipeline.push({
                    $match: { "categoryInfo.category": filters.category },
                });
            }
            pipeline.push({
                $lookup: {
                    from: "serviceproviders",
                    localField: "serviceProviderId",
                    foreignField: "_id",
                    as: "providerInfo",
                },
            }, {
                $unwind: {
                    path: "$providerInfo",
                    preserveNullAndEmptyArrays: true,
                },
            });
            if ((filters === null || filters === void 0 ? void 0 : filters.experience) !== undefined) {
                pipeline.push({
                    $match: { "providerInfo.experience": { $gte: filters.experience } },
                });
            }
            if (filters === null || filters === void 0 ? void 0 : filters.searchQuery) {
                pipeline.push({
                    $match: {
                        serviceName: {
                            $regex: filters.searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
                            $options: "i",
                        },
                    },
                });
            }
            pipeline.push({
                $project: {
                    serviceProviderName: "$providerInfo.serviceProviderName",
                    profileImage: "$providerInfo.profileImage",
                    category: "$categoryInfo.category",
                    experience: "$providerInfo.experience",
                    serviceName: 1,
                    description: 1,
                    serviceType: 1,
                    location: 1,
                    estimatedPrice: 1,
                    serviceImage: 1,
                    createdAt: 1,
                    distance: 1,
                },
            });
            pipeline.push({ $limit: limit });
            const services = yield ServiceModel_1.default.aggregate(pipeline);
            let nextCursor = null;
            if (services.length > 0) {
                const last = services[services.length - 1];
                nextCursor = (filters === null || filters === void 0 ? void 0 : filters.priceSort)
                    ? `${last.estimatedPrice}_${last._id.toString()}`
                    : last._id.toString();
            }
            return { services, nextCursor };
        });
    }
    getActiveServiceNames() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceModel_1.default.distinct("serviceName", { isActive: true });
        });
    }
    // async findNearestServicesFilter(
    //   userLongitude?: number | null,
    //   userLatitude?: number | null,
    //   filters?: {
    //     category?: string;
    //     experience?: number;
    //     priceSort?: "gtToLow" | "lowTogt";
    //     searchQuery?: string;
    //   },
    //   limit: number = 10,
    //   cursor?: string | null
    // ) {
    //   const maxDistanceInMeters = 5000;
    //   const pipeline: any[] = [];
    //   // 1. Sorting logic
    //   let sortStage: Record<string, 1 | -1> = { _id: 1 };
    //   if (filters?.priceSort === "gtToLow") {
    //     sortStage = { estimatedPrice: -1, _id: 1 };
    //   } else if (filters?.priceSort === "lowTogt") {
    //     sortStage = { estimatedPrice: 1, _id: 1 };
    //   }
    //   // 2. geoNear (if location)
    //   if (userLongitude != null && userLatitude != null) {
    //     pipeline.push({
    //       $geoNear: {
    //         near: { type: "Point", coordinates: [userLongitude, userLatitude] },
    //         distanceField: "distance",
    //         spherical: true,
    //         maxDistance: maxDistanceInMeters,
    //         query: { isActive: true }, // apply isActive here
    //       },
    //     });
    //   } else {
    //     pipeline.push({ $match: { isActive: true } });
    //   }
    //   // 3. Sorting comes BEFORE cursor match
    //   pipeline.push({ $sort: sortStage });
    //   // 4. Cursor filtering (AFTER sort)
    //   if (cursor) {
    //     if (filters?.priceSort) {
    //       const [priceStr, idStr] = cursor.split("_");
    //       const price = parseFloat(priceStr);
    //       const id = new Types.ObjectId(idStr);
    //       pipeline.push({
    //         $match: {
    //           $or: [
    //             { estimatedPrice: { [sortStage.estimatedPrice === 1 ? "$gt" : "$lt"]: price } },
    //             {
    //               estimatedPrice: price,
    //               _id: { $gt: id },
    //             },
    //           ],
    //         },
    //       });
    //     } else {
    //       pipeline.push({
    //         $match: { _id: { $gt: new Types.ObjectId(cursor) } },
    //       });
    //     }
    //   }
    //   // 5. Lookups and filters
    //   pipeline.push(
    //     {
    //       $lookup: {
    //         from: "categories",
    //         localField: "category",
    //         foreignField: "_id",
    //         as: "categoryInfo",
    //       },
    //     },
    //     {
    //       $unwind: {
    //         path: "$categoryInfo",
    //         preserveNullAndEmptyArrays: true,
    //       },
    //     }
    //   );
    //   if (filters?.category) {
    //     pipeline.push({
    //       $match: { "categoryInfo.category": filters.category },
    //     });
    //   }
    //   pipeline.push(
    //     {
    //       $lookup: {
    //         from: "serviceproviders",
    //         localField: "serviceProviderId",
    //         foreignField: "_id",
    //         as: "providerInfo",
    //       },
    //     },
    //     {
    //       $unwind: {
    //         path: "$providerInfo",
    //         preserveNullAndEmptyArrays: true,
    //       },
    //     }
    //   );
    //   if (filters?.experience !== undefined) {
    //     pipeline.push({
    //       $match: { "providerInfo.experience": { $gte: filters.experience } },
    //     });
    //   }
    //   if (filters?.searchQuery) {
    //     pipeline.push({
    //       $match: {
    //         serviceName: { $regex: filters.searchQuery, $options: "i" },
    //       },
    //     });
    //   }
    //   // 6. Final projection
    //   pipeline.push({
    //     $project: {
    //       serviceProviderName: "$providerInfo.serviceProviderName",
    //       profileImage: "$providerInfo.profileImage",
    //       category: "$categoryInfo.category",
    //       experience: "$providerInfo.experience",
    //       serviceName: 1,
    //       description: 1,
    //       serviceType: 1,
    //       location: 1,
    //       estimatedPrice: 1,
    //       serviceImage: 1,
    //       createdAt: 1,
    //       distance: 1,
    //     },
    //   });
    //   // 7. Apply limit
    //   pipeline.push({ $limit: limit });
    //   // 8. Fetch
    //   const services = await ServiceModel.aggregate(pipeline);
    //   // 9. Build nextCursor
    //   let nextCursor = null;
    //   if (services.length > 0) {
    //     const last = services[services.length - 1];
    //     nextCursor = filters?.priceSort
    //       ? `${last.estimatedPrice}_${last._id.toString()}`
    //       : last._id.toString();
    //   }
    //   return { services, nextCursor };
    // }
    // async  findNearestServicesFilter(
    //   userLongitude?: number | null,
    //   userLatitude?: number | null,
    //   filters?: {
    //     category?: string;
    //     experience?: number;
    //     priceSort?: "gtToLow" | "lowTogt";
    //     searchQuery?: string;
    //   },
    //   limit: number = 10,
    //   cursor?: string | null
    // ) {
    //   const maxDistanceInMeters = 5000;
    //   const pipeline: any[] = [];
    //   // Sorting logic
    //   const sortDirection: 1 | -1 =
    //     filters?.priceSort === "gtToLow" ? -1 : filters?.priceSort === "lowTogt" ? 1 : 1;
    //   const sortStage = filters?.priceSort
    //     ? { estimatedPrice: sortDirection, _id: sortDirection }
    //     : { _id: 1 };
    //   // Prepare geo query
    //   const baseQuery: any = { isActive: true };
    //   // Cursor logic
    //   if (cursor) {
    //     if (filters?.priceSort) {
    //       const [priceStr, idStr] = cursor.split("_");
    //       const price = parseFloat(priceStr);
    //       const id = new Types.ObjectId(idStr);
    //       baseQuery.$or = [
    //         { estimatedPrice: { [sortDirection === 1 ? "$gt" : "$lt"]: price } },
    //         {
    //           estimatedPrice: price,
    //           _id: { [sortDirection === 1 ? "$gt" : "$lt"]: id },
    //         },
    //       ];
    //     } else {
    //       baseQuery._id = { $gt: new Types.ObjectId(cursor) };
    //     }
    //   }
    //   // Geo filter
    //   if (userLongitude != null && userLatitude != null) {
    //     pipeline.push({
    //       $geoNear: {
    //         near: { type: "Point", coordinates: [userLongitude, userLatitude] },
    //         distanceField: "distance",
    //         spherical: true,
    //         maxDistance: maxDistanceInMeters,
    //         query: baseQuery,
    //       },
    //     });
    //   } else {
    //     pipeline.push({ $match: baseQuery });
    //   }
    //   pipeline.push({ $sort: sortStage });
    //   // Join with categories
    //   pipeline.push(
    //     {
    //       $lookup: {
    //         from: "categories",
    //         localField: "category",
    //         foreignField: "_id",
    //         as: "categoryInfo",
    //       },
    //     },
    //     {
    //       $unwind: {
    //         path: "$categoryInfo",
    //         preserveNullAndEmptyArrays: true,
    //       },
    //     }
    //   );
    //   // Filter category
    //   if (filters?.category) {
    //     pipeline.push({
    //       $match: { "categoryInfo.category": filters.category },
    //     });
    //   }
    //   // Join with service providers
    //   pipeline.push(
    //     {
    //       $lookup: {
    //         from: "serviceproviders",
    //         localField: "serviceProviderId",
    //         foreignField: "_id",
    //         as: "providerInfo",
    //       },
    //     },
    //     {
    //       $unwind: {
    //         path: "$providerInfo",
    //         preserveNullAndEmptyArrays: true,
    //       },
    //     }
    //   );
    //   // Filter experience
    //   if (filters?.experience !== undefined) {
    //     pipeline.push({
    //       $match: { "providerInfo.experience": { $gte: filters.experience } },
    //     });
    //   }
    //   // Search query
    //   if (filters?.searchQuery) {
    //     pipeline.push({
    //       $match: {
    //         serviceName: {
    //           $regex: filters.searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    //           $options: "i",
    //         },
    //       },
    //     });
    //   }
    //   // Final projection
    //   pipeline.push({
    //     $project: {
    //       serviceProviderName: "$providerInfo.serviceProviderName",
    //       profileImage: "$providerInfo.profileImage",
    //       category: "$categoryInfo.category",
    //       experience: "$providerInfo.experience",
    //       serviceName: 1,
    //       description: 1,
    //       serviceType: 1,
    //       location: 1,
    //       estimatedPrice: 1,
    //       serviceImage: 1,
    //       createdAt: 1,
    //       distance: 1,
    //     },
    //   });
    //   // Limit
    //   pipeline.push({ $limit: limit });
    //   const services = await ServiceModel.aggregate(pipeline);
    //   // nextCursor
    //   let nextCursor: string | null = null;
    //   if (services.length === limit) {
    //     const last = services[services.length - 1];
    //     nextCursor = filters?.priceSort
    //       ? `${last.estimatedPrice}_${last._id.toString()}`
    //       : last._id.toString();
    //   }
    //   return { services, nextCursor };
    // }
    // note
    // async findNearestServicesFilter(
    //   userLongitude?: number | null,
    //   userLatitude?: number | null,
    //   filters?: {
    //     category?: string;
    //     experience?: number;
    //     priceSort?: "gtToLow" | "lowTogt";
    //     searchQuery?: string;
    //   },
    //   limit: number = 10,
    //   cursor?: string | null
    // ) {
    //   const maxDistanceInMeters = 5000;
    //   const pipeline: any[] = [];
    //   const baseQuery: any = { isActive: true };
    //   const sortDirection: 1 | -1 =
    //     filters?.priceSort === "gtToLow" ? -1 : 1;
    //   const sortStage = filters?.priceSort
    //     ? { estimatedPrice: sortDirection, _id: sortDirection }
    //     : { _id: 1 };
    //   // Cursor logic
    //   if (cursor) {
    //     if (filters?.priceSort) {
    //       const [priceStr, idStr] = cursor.split("_");
    //       const price = parseFloat(priceStr);
    //       const id = new Types.ObjectId(idStr);
    //       baseQuery.$or = [
    //         { estimatedPrice: { [sortDirection === 1 ? "$gt" : "$lt"]: price } },
    //         {
    //           estimatedPrice: price,
    //           _id: { [sortDirection === 1 ? "$gt" : "$lt"]: id },
    //         },
    //       ];
    //     } else {
    //       baseQuery._id = { $gt: new Types.ObjectId(cursor) };
    //     }
    //   }
    //   if (userLongitude != null && userLatitude != null) {
    //     pipeline.push({
    //       $geoNear: {
    //         near: { type: "Point", coordinates: [userLongitude, userLatitude] },
    //         distanceField: "distance",
    //         spherical: true,
    //         maxDistance: maxDistanceInMeters,
    //         query: baseQuery,
    //       },
    //     });
    //   } else {
    //     pipeline.push({ $match: baseQuery });
    //   }
    //   pipeline.push({ $sort: sortStage });
    //   pipeline.push(
    //     {
    //       $lookup: {
    //         from: "categories",
    //         localField: "category",
    //         foreignField: "_id",
    //         as: "categoryInfo",
    //       },
    //     },
    //     {
    //       $unwind: {
    //         path: "$categoryInfo",
    //         preserveNullAndEmptyArrays: true,
    //       },
    //     }
    //   );
    //   if (filters?.category) {
    //     pipeline.push({ $match: { "categoryInfo.category": filters.category } });
    //   }
    //   pipeline.push(
    //     {
    //       $lookup: {
    //         from: "serviceproviders",
    //         localField: "serviceProviderId",
    //         foreignField: "_id",
    //         as: "providerInfo",
    //       },
    //     },
    //     {
    //       $unwind: {
    //         path: "$providerInfo",
    //         preserveNullAndEmptyArrays: true,
    //       },
    //     }
    //   );
    //   if (filters?.experience !== undefined) {
    //     pipeline.push({
    //       $match: { "providerInfo.experience": { $gte: filters.experience } },
    //     });
    //   }
    //   if (filters?.searchQuery) {
    //     pipeline.push({
    //       $match: {
    //         serviceName: {
    //           $regex: filters.searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    //           $options: "i",
    //         },
    //       },
    //     });
    //   }
    //   pipeline.push({
    //     $project: {
    //       serviceProviderName: "$providerInfo.serviceProviderName",
    //       profileImage: "$providerInfo.profileImage",
    //       category: "$categoryInfo.category",
    //       experience: "$providerInfo.experience",
    //       serviceName: 1,
    //       description: 1,
    //       serviceType: 1,
    //       location: 1,
    //       estimatedPrice: 1,
    //       serviceImage: 1,
    //       createdAt: 1,
    //       distance: 1,
    //     },
    //   });
    //   pipeline.push({ $limit: limit });
    //   const services = await ServiceModel.aggregate(pipeline);
    //   let nextCursor: string | null = null;
    //   if (services.length === limit) {
    //     const last = services[services.length - 1];
    //     nextCursor = filters?.priceSort
    //       ? `${last.estimatedPrice}_${last._id.toString()}`
    //       : last._id.toString();
    //   }
    //   return { services, nextCursor };
    // }
    // async findNearestActiveServiceCategories(
    //   userLongitude: number|null,
    //   userLatitude: number|null
    // ): Promise<{ categoryId: string; category: string }[]> {
    //   const maxDistanceInMeters = 50000;
    // if (userLongitude != null && userLatitude != null){
    // }
    //   return await ServiceModel.aggregate([
    //     {
    //       $geoNear: {
    //         near: {
    //           type: 'Point',
    //           coordinates: [userLongitude, userLatitude],
    //         },
    //         distanceField: 'distance',
    //         spherical: true,
    //         maxDistance: maxDistanceInMeters,
    //       },
    //     },
    //     {
    //       $match: {
    //         isActive: true,
    //       },
    //     },
    //     {
    //       $lookup: {
    //         from: 'categories',
    //         localField: 'category',
    //         foreignField: '_id',
    //         as: 'categoryInfo',
    //       },
    //     },
    //     {
    //       $unwind: '$categoryInfo',
    //     },
    //     {
    //       $group: {
    //         _id: '$categoryInfo._id',
    //         category: { $first: '$categoryInfo.category' },
    //       },
    //     },
    //     {
    //       $project: {
    //         categoryId: '$_id',
    //         category: 1,
    //         _id: 0,
    //       },
    //     },
    //   ]);
    // }
    findActiveServiceCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceModel_1.default.aggregate([
                {
                    $match: {
                        isActive: true,
                    },
                },
                {
                    $lookup: {
                        from: 'categories',
                        localField: 'category',
                        foreignField: '_id',
                        as: 'categoryInfo',
                    },
                },
                {
                    $unwind: '$categoryInfo',
                },
                {
                    $group: {
                        _id: '$categoryInfo._id',
                        category: { $first: '$categoryInfo.category' },
                    },
                },
                {
                    $project: {
                        categoryId: '$_id',
                        category: 1,
                        _id: 0,
                    },
                },
            ]);
        });
    }
    blockAllserviceServiceProvider(serviceProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ServiceModel_1.default.updateMany({ serviceProviderId }, { $set: { isActive: false } });
            }
            catch (error) {
                console.error("Error blocking all services for service provider:", error);
                throw new Error("Could not block services.");
            }
        });
    }
    activateAllServicesByServiceProvider(serviceProviderId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ServiceModel_1.default.updateMany({ serviceProviderId }, { $set: { isActive: true } });
            }
            catch (error) {
                console.error("Error activating services for service provider:", error);
                throw new Error("Could not activate services.");
            }
        });
    }
    findOnlineServicesWithSlot() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield ServiceModel_1.default.aggregate([
                {
                    $match: { serviceType: 'Online' }
                },
                {
                    $lookup: {
                        from: 'slots',
                        localField: '_id',
                        foreignField: 'serviceId',
                        as: 'slots'
                    }
                }
            ]);
        });
    }
};
exports.ServiceRepository = ServiceRepository;
exports.ServiceRepository = ServiceRepository = __decorate([
    (0, tsyringe_1.injectable)()
], ServiceRepository);
// this is the base find nearest services .
// create this kind find nearest catogery services . like catogoery name is from argument . make a lookup with the catogry db. then return the catogory === argument catogory Name, 
