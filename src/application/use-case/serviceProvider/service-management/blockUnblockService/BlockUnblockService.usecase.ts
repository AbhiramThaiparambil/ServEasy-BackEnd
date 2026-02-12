import { inject, injectable } from "tsyringe";
import { IBlockUnblockServiceUseCase } from "./IBlockUnblockService.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IServiceRepository } from "../../../../../domain/repositories/IServiceRepository";

import { BlockUnblockServiceRequestDTO } from "../../../../dtos/serviceProvider/service-management/blockUnblockService/BlockUnblockServiceRequestDTO";
import { getErrorMessage } from "../../../../../utils/errorUtils";


@injectable()
export class BlockUnblockServiceUseCase implements IBlockUnblockServiceUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceRepository) private serviceRepository: IServiceRepository
  ) {}

  async blockService(data: BlockUnblockServiceRequestDTO): Promise<boolean> {
    const { serviceId } = data;
    const res = await this.serviceRepository.blockService(serviceId);
    console.log(res);

    return res;
  }

  async unblockService(data: BlockUnblockServiceRequestDTO): Promise<boolean> {
    try {
      const { serviceId } = data;
      const res = await this.serviceRepository.unblockService(serviceId);
      return res;
    } catch (error: unknown) {
      throw new Error(getErrorMessage(error));
    }
  }
}
