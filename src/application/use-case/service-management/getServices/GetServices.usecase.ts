
import { inject, injectable } from "tsyringe";
import { IGetServicesUseCase } from "./IGetServices.usecase";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";
import { IServiceRepository } from "../../../../domain/repositories/IServiceRepository";

@injectable()
export class GetServicesUseCase implements IGetServicesUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceRepository) private serviceRepository: IServiceRepository
  ) {}

  async execute(id: string) {
    try {
      const allServices = await this.serviceRepository.findAllServiceProviderId(
        id
      );

      return allServices;
    } catch (error) {
      console.error("Error fetching services:", error);
      throw new Error("Failed to fetch services");
    }
  }
}
