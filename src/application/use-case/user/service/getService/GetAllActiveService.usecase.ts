import { inject, injectable } from "tsyringe";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IUserRepository } from "../../../../../domain/repositories/IuserRepository";
import { IServiceRepository } from "../../../../../domain/repositories/IServiceRepository";
import {
  GetNearbyServicesRequestDTO,
  GetNearbyServicesResponseDTO,
  GetAllActiveServicesRequestDTO,
  GetAllActiveServicesResponseDTO,
} from "../../../../../application/dtos/user/service/getService/GetAllActiveServiceDTO";
import { IGetAllActiveServiceUseCase } from "./IGetAllActiveService.usecase";

@injectable()
export class GetAllActiveServiceUseCase implements IGetAllActiveServiceUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceRepository)
    private serviceRepository: IServiceRepository,
    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository,
  ) {}

  async getNearByServices(
    data: GetNearbyServicesRequestDTO
  ): Promise<GetNearbyServicesResponseDTO> {
    const { userId, skip, limit, userLongitude, userLatitude, filters } = data;
    try {
      const allFilterServices =
        await this.serviceRepository.findNearestServicesFilter(
          userId,
          skip,
          limit,
          userLongitude,
          userLatitude,
          filters,
        );


      const categories =
        await this.serviceRepository.findActiveServiceCategories();

      const activeServiceNames =
        await this.serviceRepository.getActiveServiceNames();

      return { allFilterServices, categories, activeServiceNames };
    } catch (error) {
      console.error("Error fetching services:", error);
      throw new Error("Failed to fetch services");
    }
  }

  async execute(data: GetAllActiveServicesRequestDTO): Promise<GetAllActiveServicesResponseDTO> {
    const { skip, limit } = data;
    try {
      const categories =
        await this.serviceRepository.findActiveServiceCategories();

      const { services: allServices } =
        await this.serviceRepository.findAllActiveServicesUser(skip, limit);

      return { allServices, categories };
    } catch (error) {
      console.error("Error fetching active services:", error);
      throw new Error("Failed to fetch active services");
    }
  }

  async getOnlineServicesWithSlot(serviceId: string) {
    const data =
      await this.serviceRepository.findSingleOnlineServicesWithSlot(serviceId);

    console.log(data);
    return data;
  }
}
