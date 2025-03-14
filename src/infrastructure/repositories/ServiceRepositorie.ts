import { Types } from "mongoose";
import { IService } from "../../domain/entities/IService";
import { IServiceRepository } from "../../domain/repositories/IServiceRepository";
import ServiceModel from "../models/ServiceModel";
import {injectable} from "tsyringe"
@injectable()
export class ServiceRepository implements IServiceRepository {
    async create(service: IService): Promise<IService> {
      const newService = new ServiceModel(service);
      return await newService.save();
    }
    
    async findById(serviceId: Types.ObjectId): Promise<IService | null> {
      return await ServiceModel.findById(serviceId);
    }
    
    async findAll(): Promise<IService[]> {
      return await ServiceModel.find();
    }
    
    async update(serviceId: Types.ObjectId, service: Partial<IService>): Promise<IService | null> {
      return await ServiceModel.findByIdAndUpdate(serviceId, service, { new: true });
    }
    
    async delete(serviceId: Types.ObjectId): Promise<boolean> {
      const result = await ServiceModel.findByIdAndDelete(serviceId);
      return !!result;
    }
  }