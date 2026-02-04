import { inject, injectable } from "tsyringe";

import { IBlockUnblockService } from "./IBlockUnblock.usecase";
import { IServiceRepository } from "../../../../../domain/repositories/IServiceRepository";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";

@injectable()
export class BlockUnblockService implements IBlockUnblockService {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceRepository)
    private serviceRepository: IServiceRepository,
  ) {}

  async blockService(serviceId: string): Promise<boolean> {
    const res = await this.serviceRepository.blockService(serviceId);
    console.log(res);

    return res;
  }

  async unblockService(serviceId: string): Promise<boolean> {
    try {
      const res = await this.serviceRepository.unblockService(serviceId);
      return res;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
