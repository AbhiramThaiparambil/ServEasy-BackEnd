import { inject, injectable } from "tsyringe";

import { Types } from "mongoose";
import { IGetServiceNamesUseCase } from "./IGetServiceNames.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IServiceRepository } from "../../../../../domain/repositories/IServiceRepository";
import { IServiceNameDTO } from "../../../../../utils/types/dto/IServiceNameDTO";

import { GetServiceNamesRequestDTO } from "../../../../dtos/serviceProvider/service-management/getServiceNames/GetServiceNamesRequestDTO";

@injectable()
export class GetServiceNamesUseCase implements IGetServiceNamesUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceRepository)
    private serviceRepo: IServiceRepository
  ) {}

  async execute(data: GetServiceNamesRequestDTO): Promise<IServiceNameDTO[]> {
    try {
      const { providerId } = data;
      const services = await this.serviceRepo.findAllServiceProviderId(
        new Types.ObjectId(providerId)
      );

      return services.map((service) => ({
        serviceName: service.serviceName,
        serviceId: service._id?.toString(),
      }));
    } catch (error: unknown) {
      console.log(error);
      throw error;
    }
  }
}
