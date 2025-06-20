import { inject, injectable } from "tsyringe";
import { ServiceProviderRepository } from "../../../../infrastructure/repositories/ServiceProviderRepository"; 
import { IServiceProviderRepository } from "../../../../domain/repositories/IserviceProviderRepository"; 
import { ServiceRepository } from "../../../../infrastructure/repositories/ServiceRepositorie";

@injectable()
export class BlockUnblockSericeProvider {
  constructor(
    @inject(ServiceProviderRepository) private serviceProviderRepository: IServiceProviderRepository,
    @inject(ServiceRepository) private serviceRepo:ServiceRepository
  ) {}

  async blockServiceProvider(serviceProviderId: string): Promise<boolean> {
        await this.serviceRepo.blockAllserviceServiceProvider(serviceProviderId)

    const res = await this.serviceProviderRepository.blockService(serviceProviderId);
    console.log(res);
    
    return res;
  }

  async unblockServiceProvider(serviceProviderId: string): Promise<boolean> {
    try {
              await this.serviceRepo.activateAllServicesByServiceProvider(serviceProviderId)

      const res = await this.serviceProviderRepository.unblockService(serviceProviderId);
      return res;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
