import { Types } from "mongoose";
import { IServiceProvider } from "../entities/IServiceProvider";
export interface IServiceProviderRepository {
  create(ServiceProvider: IServiceProvider): Promise<IServiceProvider>;
  findByEmail(email: string): Promise<IServiceProvider | null>;
  // findByPhone(phone:string):Promise<IServiceProvider |null>

  findById(id: string|Types.ObjectId): Promise<IServiceProvider | null>;
  update(
    id: string,
    data: Partial<IServiceProvider>
  ): Promise<IServiceProvider | null>;

  findServiceProviderSkipLimit(skip:number,limit:number): Promise<IServiceProvider[]>;
  findByUserID(userId: string): Promise<IServiceProvider | null>;
   unblockService(ServiceProviderId: string): Promise<boolean> 
   findServiceProvidersCount():Promise<number>
     blockService(ProviderId: string): Promise<boolean> 
}
