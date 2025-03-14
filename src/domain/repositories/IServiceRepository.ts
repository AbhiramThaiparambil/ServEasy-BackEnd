import { IService } from "../entities/IService";
import { Types } from 'mongoose';

export interface IServiceRepository {
    create(service: IService): Promise<IService>;
    findById(serviceId: Types.ObjectId): Promise<IService | null>;
    findAll(): Promise<IService[]>;
    update(serviceId: Types.ObjectId, service: Partial<IService>): Promise<IService | null>;
    delete(serviceId: Types.ObjectId): Promise<boolean>;
  }
  