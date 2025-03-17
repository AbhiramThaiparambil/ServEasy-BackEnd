import { inject, injectable } from "tsyringe";
import { ServiceProviderRepository } from "../../../../infrastructure/repositories/ServiceProviderRepository"; 
import { IServiceProviderRepository } from "../../../../domain/repositories/IserviceProviderRepository"; 

@injectable()
export class BlockUnblockSericeProvider {
  constructor(
    @inject(ServiceProviderRepository) private serviceProviderRepository: IServiceProviderRepository
  ) {}

  async blockServiceProvider(serviceId: string): Promise<boolean> {
    const res = await this.serviceProviderRepository.blockService(serviceId);
    console.log(res);
    
    return res;
  }

  async unblockServiceProvider(serviceId: string): Promise<boolean> {
    try {
      const res = await this.serviceProviderRepository.unblockService(serviceId);
      return res;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
