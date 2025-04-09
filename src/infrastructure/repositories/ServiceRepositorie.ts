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

}
