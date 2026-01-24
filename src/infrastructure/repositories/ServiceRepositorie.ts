import mongoose, { PipelineStage, Types } from "mongoose";
import { IOnlineService, IService } from "../../domain/entities/IService";
import { IServiceRepository } from "../../domain/repositories/IServiceRepository";
import ServiceModel from "../models/ServiceModel";
import { injectable } from "tsyringe";
import { SlotModel } from "../models/SlotModel";
import {
  INearbyServicePagination,
  INearbyServiceResult,
} from "../../utils/types/dto/INearbyServiceResult";
import { ISingleServiceWithProvider } from "../../utils/types/ISingleServiceWithProvider";
@injectable()
export class ServiceRepository implements IServiceRepository {
  async create(service: IService): Promise<IService> {
    const newService = new ServiceModel(service);
    return await newService.save();
  }

  async findById(serviceId: Types.ObjectId): Promise<IService | null> {
    return await ServiceModel.findById(serviceId);
  }
  async findAllServiceProviderId(
    serviceProviderId: Types.ObjectId | string,
  ): Promise<IService[]> {
    return await ServiceModel.find({
      serviceProviderId: serviceProviderId,
    }).exec();
  }

  async findAll(): Promise<IService[]> {
    return await ServiceModel.find();
  }

  async update(
    serviceId: Types.ObjectId,
    service: Partial<IService>,
  ): Promise<IService | null> {
    return await ServiceModel.findByIdAndUpdate(serviceId, service, {
      new: true,
    });
  }

  async delete(serviceId: Types.ObjectId): Promise<boolean> {
    const result = await ServiceModel.findByIdAndDelete(serviceId);
    return !!result;
  }

  async blockService(serviceId: string): Promise<boolean> {
    try {
      const result = await ServiceModel.updateOne(
        { _id: serviceId },
        { $set: { isActive: false } },
      );
      return result.modifiedCount > 0;
    } catch (error: any) {
      throw error;
    }
  }

  async unblockService(serviceId: string): Promise<boolean> {
    try {
      const result = await ServiceModel.updateOne(
        { _id: serviceId },
        { $set: { isActive: true } },
      );
      return result.modifiedCount > 0;
    } catch (error) {
      throw error;
    }
  }
  async updateService(id: string, newData: IService): Promise<IService | null> {
    try {
      return await ServiceModel.findOneAndReplace({ _id: id }, newData, {
        new: true,
      });
    } catch (error) {
      throw error;
    }
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

  async getServicesWithProviderDetails(
    skip: number,
    limit: number,
    search: string,
  ) {
    return await ServiceModel.aggregate([
      {
        $match: {
          $or: [
            { serviceName: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ],
        },
      },
      {
        $lookup: {
          from: "serviceproviders",
          localField: "serviceProviderId",
          foreignField: "_id",
          as: "serviceProviderDetails",
        },
      },
      {
        $unwind: {
          path: "$serviceProviderDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      { $skip: skip },
      { $limit: limit },
    ]);
  }

  async getServicesWithProviderDetailsCount(): Promise<number> {
    return await ServiceModel.countDocuments();
  }

  async getSingleServiceWithProviderDetails(
    serviceId: string,
  ): Promise<ISingleServiceWithProvider[]> {
    return await ServiceModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(serviceId) },
      },
      {
        $lookup: {
          from: "reviews",
          let: { serviceId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$serviceId", "$$serviceId"] },
              },
            },
            {
              $group: {
                _id: null,
                avgRating: { $avg: "$rating" },
                totalReviews: { $sum: 1 },
              },
            },
          ],
          as: "reviewDetails",
        },
      },
      {
        $unwind: {
          path: "$reviewDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "serviceproviders",
          localField: "serviceProviderId",
          foreignField: "_id",
          as: "serviceProviderDetails",
        },
      },
      {
        $unwind: {
          path: "$serviceProviderDetails",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $limit: 1,
      },
    ]);
  }

  async findAllActiveServices(): Promise<IService[]> {
    return await ServiceModel.find({ isActive: true });
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

  async findAllActiveServicesUser(
    skip: number,
    limit: number,
  ): Promise<{ services: INearbyServiceResult[] }> {
    const pipeline: PipelineStage[] = [
      {
        $match: {
          isActive: true,
        },
      },

      {
        $sort: { _id: 1 },
      },

      {
        $skip: skip,
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

    const services = await ServiceModel.aggregate(pipeline);

    return { services };
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

  async findNearestServicesFilterCatogory(
    userLongitude: number,
    userLatitude: number,
    category: string,
    serviceProviderId?: Types.ObjectId | string,
    limit: number = 10,
    cursor?: string | null,
  ) {
    const maxDistanceInMeters = 5000;

    const matchStage: any = {
      isActive: true,
      serviceProviderId: { $ne: new Types.ObjectId(serviceProviderId) },
    };

    if (cursor) {
      matchStage._id = { $gt: new Types.ObjectId(cursor) };
    }

    const services = await ServiceModel.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [userLongitude, userLatitude],
          },
          distanceField: "distance",
          spherical: true,
          maxDistance: maxDistanceInMeters,
        },
      },
      { $match: matchStage },
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
        // 👇 Filter by category name here
        $match: {
          "categoryInfo.category": category,
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
      },
      { $sort: { _id: 1 } },
      { $limit: limit },
    ]);

    const nextCursor =
      services.length > 0 ? services[services.length - 1]._id.toString() : null;

    return { services, nextCursor };
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

  async findNearestServicesFilter(
    userId: string,
    skip: number,
    limit: number,
    userLongitude?: number | null,
    userLatitude?: number | null,
    filters?: {
      category?: string;
      experience?: number;
      priceSort?: "gtToLow" | "lowTogt";
      searchQuery?: string;
    },
  ): Promise<{ services: INearbyServiceResult[] }> {
    const maxDistanceInMeters = 20000;
    const pipeline: any[] = [];

    /* -------------------- CATEGORY OBJECT ID -------------------- */
    const categoryObjectId =
      filters?.category && Types.ObjectId.isValid(filters.category)
        ? new Types.ObjectId(filters.category)
        : null;

    /* -------------------- SORT SETUP -------------------- */
    let sortStage: Record<string, 1 | -1> = { _id: 1 };

    if (filters?.priceSort === "gtToLow") {
      sortStage = { estimatedPrice: -1, _id: -1 };
    } else if (filters?.priceSort === "lowTogt") {
      sortStage = { estimatedPrice: 1, _id: 1 };
    }

    /* -------------------- GEO / BASE MATCH -------------------- */
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
    } else {
      pipeline.push({ $match: { isActive: true } });
    }

    /* -------------------- SORT -------------------- */
    pipeline.push({ $sort: sortStage });

    /* -------------------- CATEGORY FILTER -------------------- */
    if (categoryObjectId) {
      pipeline.push({
        $match: { category: { $in: [categoryObjectId] } },
      });
    }

    /* -------------------- CURRENT USER LOOKUP -------------------- */
    pipeline.push(
      {
        $lookup: {
          from: "users",
          let: { currentUserId: new Types.ObjectId(userId) },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$currentUserId"] } } },
            { $project: { serviceProvider: 1 } },
          ],
          as: "currentUser",
        },
      },
      { $addFields: { currentUser: { $arrayElemAt: ["$currentUser", 0] } } },
    );

    /* -------------------- PROVIDER LOOKUP -------------------- */
    pipeline.push(
      {
        $lookup: {
          from: "serviceproviders",
          localField: "serviceProviderId",
          foreignField: "_id",
          as: "providerInfo",
        },
      },
      { $unwind: "$providerInfo" },
    );

    /* -------------------- PROVIDER WALLET BLOCK CHECK -------------------- */
    pipeline.push(
      {
        $lookup: {
          from: "providerwallets",
          localField: "serviceProviderId",
          foreignField: "serviceProviderId",
          as: "walletInfo",
        },
      },
      {
        $unwind: {
          path: "$walletInfo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: {
          "walletInfo.isBlocked": { $ne: true },
        },
      },
    );

    /* -------------------- EXCLUDE USER'S OWN PROVIDER -------------------- */
    pipeline.push({
      $match: {
        $expr: {
          $cond: [
            { $ifNull: ["$currentUser.serviceProvider", false] },
            { $ne: ["$serviceProviderId", "$currentUser.serviceProvider"] },
            true,
          ],
        },
      },
    });

    /* -------------------- EXPERIENCE FILTER -------------------- */
    if (filters?.experience !== undefined) {
      pipeline.push({
        $match: {
          "providerInfo.experience": { $gte: filters.experience },
        },
      });
    }

    /* -------------------- SEARCH FILTER -------------------- */
    if (filters?.searchQuery) {
      pipeline.push({
        $match: {
          serviceName: {
            $regex: filters.searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
            $options: "i",
          },
        },
      });
    }

    /* -------------------- PAGINATION (SKIP + LIMIT) -------------------- */
    pipeline.push({ $skip: skip }, { $limit: limit });

    /* -------------------- FINAL PROJECTION -------------------- */
    pipeline.push({
      $project: {
        serviceProviderName: "$providerInfo.serviceProviderName",
        profileImage: "$providerInfo.profileImage",
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

    /* -------------------- EXECUTE -------------------- */
    const services = await ServiceModel.aggregate(pipeline);

    return { services };
  }

  async getActiveServiceNames(): Promise<string[]> {
    return await ServiceModel.distinct("serviceName", { isActive: true });
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

  async findActiveServiceCategories(): Promise<
    { categoryId: string; category: string }[]
  > {
    return await ServiceModel.aggregate([
      {
        $match: {
          isActive: true,
        },
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
        $unwind: "$categoryInfo",
      },
      {
        $group: {
          _id: "$categoryInfo._id",
          category: { $first: "$categoryInfo.category" },
        },
      },
      {
        $project: {
          categoryId: "$_id",
          category: 1,
          _id: 0,
        },
      },
    ]);
  }

  async blockAllserviceServiceProvider(
    serviceProviderId: string,
  ): Promise<boolean> {
    try {
      const result = await ServiceModel.updateMany(
        { serviceProviderId },
        { $set: { isActive: false } },
      );

      return result.modifiedCount > 0;
    } catch (error) {
      console.error("Error blocking all services for service provider:", error);
      return false;
    }
  }

  async activateAllServicesByServiceProvider(
    serviceProviderId: string,
  ): Promise<boolean> {
    try {
      const result = await ServiceModel.updateMany(
        { serviceProviderId },
        { $set: { isActive: true } },
      );

      return result.modifiedCount > 0;
    } catch (error) {
      console.error("Error activating services for service provider:", error);
      return false;
    }
  }

  async findOnlineServicesWithSlot(): Promise<IOnlineService[]> {
    return await ServiceModel.aggregate([
      {
        $match: { serviceType: "Online" },
      },
      {
        $lookup: {
          from: "slots",
          localField: "_id",
          foreignField: "serviceId",
          as: "slots",
        },
      },
    ]);
  }

  async findSingleOnlineServicesWithSlot(
    serviceId: string,
  ): Promise<IOnlineService[]> {
    return await ServiceModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(serviceId),
          serviceType: "Online",
        },
      },
      {
        $lookup: {
          from: "slots",
          localField: "_id",
          foreignField: "serviceId",
          as: "slots",
        },
      },
      {
        $project: {
          _id: 1,
          serviceName: 1,
          description: 1,
          serviceImage: 1,
          slots: 1,
        },
      },
    ]);
  }
}

// this is the base find nearest services .

// create this kind find nearest catogery services . like catogoery name is from argument . make a lookup with the catogry db. then return the catogory === argument catogory Name,
