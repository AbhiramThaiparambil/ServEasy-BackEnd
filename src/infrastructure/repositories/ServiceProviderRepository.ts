
import { injectable } from "tsyringe";
import {IServiceProviderRepository} from "../../domain/repositories/IserviceProviderRepository";
import {IServiceProvider} from "../../domain/entities/ServiceProvider";
import ServiceProviderModel from "../models/ServiceProviderModel"; // Mongoose Model

@injectable()
export class ServiceProviderRepository implements IServiceProviderRepository {
  async create(serviceProvider: IServiceProvider): Promise<IServiceProvider> {
    const newProvider = new ServiceProviderModel(serviceProvider);
    return await newProvider.save();
  }

  async findByEmail(email: string): Promise<IServiceProvider | null> {
    return await ServiceProviderModel.findOne({ email });
  }

  async findById(id: string): Promise<IServiceProvider | null> {
    return await ServiceProviderModel.findById(id);
  }
  
  async update(id: string, data: Partial<IServiceProvider>): Promise<IServiceProvider | null> {
    return await ServiceProviderModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await ServiceProviderModel.findByIdAndDelete(id);
    return result !== null;
  }
}
