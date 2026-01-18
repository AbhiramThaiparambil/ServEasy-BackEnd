import { inject, injectable } from "tsyringe";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IUserRepository } from "../../../../../domain/repositories/IuserRepository";
import { IServiceRepository } from "../../../../../domain/repositories/IServiceRepository";
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
    userLongitude: number | null,
    userLatitude: number | null,
    filters?: {
      category?: string;
      experience?: number;
      priceSort?: "gtToLow" | "lowTogt";
      searchQuery?: string;
    },
    limit: number = 10,
    cursor: string | null = null,
  ) {
    try {
      const allFilterServices =
        await this.serviceRepository.findNearestServicesFilter(
          userLongitude,
          userLatitude,
          filters,
          limit,
          cursor,
        );

      console.log(allFilterServices);

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

  async execute({ limit, cursor }: { limit: number; cursor?: string | null }) {
    try {
      const categories =
        await this.serviceRepository.findActiveServiceCategories();

      const { services: allServices, nextCursor } =
        await this.serviceRepository.findAllActiveServicesUser(limit, cursor);

      return { allServices, categories, nextCursor };
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
