import { inject, injectable } from "tsyringe";
import { SERVICE_TOKENS } from "../../../../../constants/tokens";
import { IServiceRepository } from "../../../../../domain/repositories/IServiceRepository";
import { IBlockUnblockService } from "./IBlockUnblock.usecase";

@injectable()
export class BlockUnblockSer implements IBlockUnblockService {
  constructor(
    @inject(SERVICE_TOKENS.ServiceRepository)
    private serviceRepository: IServiceRepository
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
