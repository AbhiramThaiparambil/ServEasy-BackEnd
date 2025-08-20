import { injectable } from 'tsyringe';
import { IServiceProviderRepository } from '../../domain/repositories/IserviceProviderRepository';
import {
  IBankDetails,
  IServiceProvider,
  IServiceProviderRegistration,
  IUpdateProfile,
} from '../../domain/entities/IServiceProvider';
import ServiceProviderModel from '../models/ServiceProviderModel'; 
import mongoose from 'mongoose';
import { ISubscription } from '../../domain/entities/ISubscription';

@injectable()
export class ServiceProviderRepository implements IServiceProviderRepository {
  async create(serviceProvider: IServiceProviderRegistration): Promise<IServiceProvider> {
    console.log(serviceProvider.bankDetails);

    const newProvider = new ServiceProviderModel(serviceProvider);
    return await newProvider.save();
  }

  async findByEmail(email: string): Promise<IServiceProvider | null> {
    return await ServiceProviderModel.findOne({ email });
  }

  async findById(id: string | mongoose.Types.ObjectId): Promise<IServiceProvider | null> {
    return await ServiceProviderModel.findById(id);
  }

  async update(id: string, data: Partial<IServiceProvider>): Promise<IServiceProvider | null> {
    return await ServiceProviderModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async delete(id: string): Promise<boolean> {
    const result = await ServiceProviderModel.findByIdAndDelete(id);
    return result !== null;
  }

  async findServiceProviderSkipLimit(
    skip: number,
    limit: number,
    search: string
  ): Promise<IServiceProvider[]> {
    return await ServiceProviderModel.find({
      $or: [
        { serviceProviderName: { $regex: search, $options: 'i' } },
        { serviceProviderEmail: { $regex: search, $options: 'i' } },
      ],
    })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
  }
  async findServiceProvidersCount() {
    return await ServiceProviderModel.countDocuments();
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

  async editProvider(data: IUpdateProfile): Promise<boolean> {
    if (!data._id) {
      throw new Error('Provider ID is required to edit provider.');
    }

    const existingProvider = await this.findById(data._id + '');
    if (!existingProvider) {
      throw new Error('Service Provider not found.');
    }

    const isUnchanged = Object.keys(data).every(key => {
      // @ts-ignore
      return data[key] === existingProvider[key];
    });

    if (isUnchanged) {
      return true;
    }

    await ServiceProviderModel.findByIdAndUpdate(data._id, data, { new: true });
    return true;
  }

  async addSubscription  (
    providerId: string,
    subscription:ISubscription
  ) {
    return await ServiceProviderModel.findByIdAndUpdate(
      providerId,
      {
        $push: {
         subscriptions: {   
          planId: subscription.planId,
          startDate: subscription.startDate,
          endDate: subscription.endDate,
          status: 'active',
          paymentId: subscription.paymentId,
          createdAt: new Date(),
        },
        },
      },
      { new: true } 
    );
  };
}
