import { injectable } from "tsyringe";
import { IServiceProviderRepository } from "../../domain/repositories/IserviceProviderRepository";
import { IServiceProvider } from "../../domain/entities/IServiceProvider";
import ServiceProviderModel from "../models/ServiceProviderModel"; // Mongoose Model
import mongoose from "mongoose";

@injectable()
export class ServiceProviderRepository implements IServiceProviderRepository {
  async create(serviceProvider: IServiceProvider): Promise<IServiceProvider> {
    const newProvider = new ServiceProviderModel(serviceProvider);
    return await newProvider.save();
  }

  async findByEmail(email: string): Promise<IServiceProvider | null> {
    return await ServiceProviderModel.findOne({ email });
  }

  async findById(id: string|mongoose.Types.ObjectId): Promise<IServiceProvider | null> {
    return await ServiceProviderModel.findById(id);
  }

  async update(
    id: string,
    data: Partial<IServiceProvider>
  ): Promise<IServiceProvider | null> {
    return await ServiceProviderModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async delete(id: string): Promise<boolean> {
    const result = await ServiceProviderModel.findByIdAndDelete(id);
    return result !== null;
  }

  async findServiceProviderSkipLimit(skip:number,limit:number): Promise<IServiceProvider[]> {
    return await ServiceProviderModel.find().skip(skip).limit(limit).sort({createdAt:-1})
  }
  async findServiceProvidersCount(){
    return await  ServiceProviderModel.countDocuments()
  }

  async findByUserID(userId: string): Promise<IServiceProvider | null> {
    return await ServiceProviderModel.findOne({ userId: userId });
  }

  async blockService(ProviderId: string): Promise<boolean> {
    try {
      const result = await ServiceProviderModel.updateOne(
        { _id: ProviderId },
        { $set: { isBlocked: true } }
      );
      return result.modifiedCount > 0;
    } catch (error: any) {
      throw error;
    }
  }

  async unblockService(ProviderId: string): Promise<boolean> {
    try {
      const result = await ServiceProviderModel.updateOne(
        { _id: ProviderId },
        { $set: { isBlocked: false } }
      );
      return result.modifiedCount > 0;
    } catch (error) {
      throw error;
    }
  }
}
