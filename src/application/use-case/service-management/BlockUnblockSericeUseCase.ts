import { inject, injectable } from "tsyringe";
import { IService } from "../../../domain/entities/IService";
import { ServiceRepository } from "../../../infrastructure/repositories/ServiceRepositorie";
import { REPOSITORY_TOKENS } from "../../../constants/tokens";

@injectable()
export class BlockUnblockSericeUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceRepository) private serviceRepository: ServiceRepository
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
