import { inject, injectable } from "tsyringe";

import { IBlockUnblockService } from "./IBlockUnblock.usecase";
import { IServiceRepository } from "../../../../../domain/repositories/IServiceRepository";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { BlockUnblockServiceRequestDTO } from "../../../../dtos/admin/service/BlockUnblockServiceDTO";
import { getErrorMessage } from "../../../../../utils/errorUtils";


@injectable()
export class BlockUnblockService implements IBlockUnblockService {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceRepository)
    private serviceRepository: IServiceRepository,
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
