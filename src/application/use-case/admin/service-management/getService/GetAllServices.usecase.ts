// import { IService } from "../../domain/entities/IService";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IServiceRepository } from "../../../../../domain/repositories/IServiceRepository";
import { inject, injectable } from "tsyringe";
import { IGetAllServices } from "./IGetAllServices.usecase";
@injectable()
export class GetAllServices implements IGetAllServices {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceRepository)
    private serviceRepository: IServiceRepository
  ) {}

  async execute(skip: number, limit: number, search: string) {
    try {
      const allServices: any =
        await this.serviceRepository.getServicesWithProviderDetails(
          skip,
          limit,
          search
        );
      const count =
        await this.serviceRepository.getServicesWithProviderDetailsCount();

      console.log(count);

      return { allServices, count };
    } catch (error) {
      console.error("Error adding new service:", error);
      throw new Error("Failed to Fetch services");
    }
  }
}
