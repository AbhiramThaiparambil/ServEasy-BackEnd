import { inject, injectable } from "tsyringe";
import { IServiceRepository } from "../../../../../domain/repositories/IServiceRepository";
import { IServiceNameDTO } from "../../../../../utils/types/dto/IServiceNameDTO";
import { Types } from "mongoose";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IGetServiceNamesUseCase } from "./IGetServiceNames.usecase";

@injectable()
export class GetServiceNamesUseCase implements IGetServiceNamesUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceRepository)
    private serviceRepo: IServiceRepository
  ) {}

  async execute(providerId: string): Promise<IServiceNameDTO[]> {
    try {
      const services = await this.serviceRepo.findAllServiceProviderId(
        new Types.ObjectId(providerId)
      );

      return services.map((service) => ({
        serviceName: service.serviceName,
        serviceId: service._id?.toString(),
      }));
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
