import { IServiceProvider } from "../entities/ServiceProvider";

export interface IServiceProviderRepository {
  create(ServiceProvider: IServiceProvider): Promise<IServiceProvider>;
  findByEmail(email: string): Promise<IServiceProvider | null>;
  // findByPhone(phone:string):Promise<IServiceProvider |null>

  findById(id: string): Promise<IServiceProvider | null>;
  update(
    id: string,
    data: Partial<IServiceProvider>
  ): Promise<IServiceProvider | null>;
  
    find():Promise<IServiceProvider[]>;
  
   

}
