
import { inject, injectable } from "tsyringe";
import { IGetServicesUseCase } from "./IGetServices.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IServiceRepository } from "../../../../../domain/repositories/IServiceRepository";

import { GetProviderServicesRequestDTO } from "../../../../dtos/serviceProvider/service-management/getServices/GetProviderServicesRequestDTO";

@injectable()
export class GetServicesUseCase implements IGetServicesUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceRepository) private serviceRepository: IServiceRepository
  ) {}

  async execute(data: GetProviderServicesRequestDTO) {
    try {
      const { providerId } = data;
      const allServices = await this.serviceRepository.findAllServiceProviderId(
        providerId
      );

      return allServices;
    } catch (error) {
      console.error("Error fetching services:", error);
      throw new Error("Failed to fetch services");
    }
  }
}
