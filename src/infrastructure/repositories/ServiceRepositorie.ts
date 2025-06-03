import mongoose, { Types } from "mongoose";
import { IService } from "../../domain/entities/IService";
import { IServiceRepository } from "../../domain/repositories/IServiceRepository";
import ServiceModel from "../models/ServiceModel";
import { injectable } from "tsyringe";
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
    serviceProviderId: Types.ObjectId | string
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
    service: Partial<IService>
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
        { $set: { isActive: false } }
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
        { $set: { isActive: true } }
      );
      return result.modifiedCount > 0;
    } catch (error) {
      throw error;
    }
  }
  async updateService(id: string, newData: IService):Promise<IService | null>  {
    try {
      return  await ServiceModel.findOneAndReplace(
        { _id: id },
        newData,
        { new: true }
      );
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


  async getServicesWithProviderDetails(skip: number, limit: number) {
    return await ServiceModel.aggregate([
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
  }

  async getServicesWithProviderDetailsCount(){
return await ServiceModel.countDocuments()
  }


  async getSingleServiceWithProviderDetails(serviceId: string) {
    return await ServiceModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(serviceId) } 
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
        $unwind: { path: "$serviceProviderDetails", preserveNullAndEmptyArrays: true }
      },
      
      {
        $limit: 1 
      }
    ]);
  }
  

  async findAllActiveServices(): Promise<IService[]> {
    return await ServiceModel.find({ isActive: true });
}




  async findAllActiveServicesUser(): Promise<any> {

return await ServiceModel.aggregate([
  
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
      $unwind: {
        path: '$categoryInfo',
        preserveNullAndEmptyArrays: true,
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
  ]);
  }



async  findNearestServices(
  userLongitude: number,
  userLatitude: number,
  serviceProviderId?: Types.ObjectId |string
) {
  const maxDistanceInMeters = 50000;

  return await ServiceModel.aggregate([
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
    {
      $match: {
        isActive: true,
        serviceProviderId: { $ne: serviceProviderId }, // Exclude the current provider if needed
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
      $unwind: {
        path: '$categoryInfo',
        preserveNullAndEmptyArrays: true,
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
  ]);
}

async findNearestActiveServiceCategories(
  userLongitude: number,
  userLatitude: number
): Promise<{ categoryId: string; category: string }[]> {
  const maxDistanceInMeters = 50000;

  return await ServiceModel.aggregate([
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
}



async findActiveServiceCategories(
 
): Promise<{ categoryId: string; category: string }[]> {

  return await ServiceModel.aggregate([
    
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
}

}
