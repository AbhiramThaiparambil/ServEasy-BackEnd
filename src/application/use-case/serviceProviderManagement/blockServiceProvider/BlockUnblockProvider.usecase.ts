import { inject, injectable } from "tsyringe";

import { IBlockUnblockSericeProvider } from "./IBlockUnblockSericeProvider.usecase";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";
import { IServiceProviderRepository } from "../../../../domain/repositories/IserviceProviderRepository";
import { IServiceRepository } from "../../../../domain/repositories/IServiceRepository";
import { ServiceRepository } from "../../../../infrastructure/repositories/ServiceRepositorie";

@injectable()
export class BlockUnblockSericeProvider implements IBlockUnblockSericeProvider {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceProviderRepository)
    private serviceProviderRepository: IServiceProviderRepository,
    @inject(REPOSITORY_TOKENS.ServiceRepository)
    private serviceRepo: ServiceRepository
  ) {}

  async blockServiceProvider(serviceProviderId: string): Promise<boolean> {
    await this.serviceRepo.blockAllserviceServiceProvider(serviceProviderId);

    const res = await this.serviceProviderRepository.blockService(
      serviceProviderId
    );
    console.log(res);

    return res;
  }

  async unblockServiceProvider(serviceProviderId: string): Promise<boolean> {
    try {
      await this.serviceRepo.activateAllServicesByServiceProvider(
        serviceProviderId
      );

      const res = await this.serviceProviderRepository.unblockService(
        serviceProviderId
      );
      return res;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
