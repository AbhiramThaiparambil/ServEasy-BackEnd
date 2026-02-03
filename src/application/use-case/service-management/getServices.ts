import { IService } from "../../../domain/entities/IService";
import { ServiceRepository } from "../../../infrastructure/repositories/ServiceRepositorie";
import { inject, injectable } from "tsyringe";
import { REPOSITORY_TOKENS } from "../../../constants/tokens";
@injectable()
export class GetService {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceRepository) private serviceRepository: ServiceRepository
  ) {}

  async execute(id: string) {
    try {
      const allServices = await this.serviceRepository.findAllServiceProviderId(
        id
      );

      return allServices;
    } catch (error) {
      console.error("Error adding new service:", error);
      throw new Error("Failed to add new service");
    }
  }
}
