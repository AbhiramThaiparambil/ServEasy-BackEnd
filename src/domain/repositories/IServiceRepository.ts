import { IOnlineService, IService } from "../entities/IService";
import { Types } from "mongoose";

export interface IServiceRepository {
  create(service: IService): Promise<IService>;
  findById(serviceId: Types.ObjectId): Promise<IService | null>;
  findAllServiceProviderId(
    serviceProviderId: Types.ObjectId | string
  ): Promise<IService[]>;

  findAll(): Promise<IService[]>;
  update(
    serviceId: Types.ObjectId,
    service: Partial<IService>
  ): Promise<IService | null>;
  delete(serviceId: Types.ObjectId): Promise<boolean>;
  blockService(serviceId: string): Promise<boolean>;
  unblockService(serviceId: string): Promise<boolean>;
  updateService(id: string, newData: IService): Promise<IService | null>;
  findAllActiveServices(): Promise<IService[]>;
   findAllServiceProviderId(
      serviceProviderId: Types.ObjectId | string
    ): Promise<IService[]>
  findOnlineServicesWithSlot():Promise<IOnlineService[]|[]>
}
