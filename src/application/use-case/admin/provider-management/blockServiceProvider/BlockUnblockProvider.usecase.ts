import { inject, injectable } from "tsyringe";
import { BlockUnblockProviderDTO } from "../../../../dtos/admin/provider/BlockUnblockProviderDTO";

import { IBlockUnblockProviderUseCase } from "./IBlockUnblockProvider.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IServiceProviderRepository } from "../../../../../domain/repositories/IserviceProviderRepository";
import { ServiceRepository } from "../../../../../infrastructure/repositories/ServiceRepositorie";
import { getErrorMessage } from "../../../../../utils/errorUtils";


@injectable()
export class BlockUnblockProviderUseCase implements IBlockUnblockProviderUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceProviderRepository)
    private serviceProviderRepository: IServiceProviderRepository,
    @inject(REPOSITORY_TOKENS.ServiceRepository)
    private serviceRepo: ServiceRepository
  ) {}

  async blockServiceProvider(data: BlockUnblockProviderDTO): Promise<boolean> {
    await this.serviceRepo.blockAllserviceServiceProvider(data.serviceProviderId);

    const res = await this.serviceProviderRepository.blockService(
      data.serviceProviderId
    );
    console.log(res);

    return res;
  }

  async unblockServiceProvider(data: BlockUnblockProviderDTO): Promise<boolean> {
    try {
      await this.serviceRepo.activateAllServicesByServiceProvider(
        data.serviceProviderId
      );

      const res = await this.serviceProviderRepository.unblockService(
        data.serviceProviderId
      );
      return res;
    } catch (error: unknown) {
      throw new Error(getErrorMessage(error));
    }
  }
}
