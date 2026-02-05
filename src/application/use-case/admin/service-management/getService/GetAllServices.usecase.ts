// import { IService } from "../../../domain/entities/IService";
import { inject, injectable } from "tsyringe";
import { IGetAllServices } from "./IGetAllServices.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IServiceRepository } from "../../../../../domain/repositories/IServiceRepository";
import { GetServiceListRequestDTO, GetServiceListResponseDTO } from "../../../../dtos/admin/service/GetServiceListDTO";
import { IServiceWithProviderDetails } from "../../../../../utils/types/IServiceWithProviderDetails";

@injectable()
export class GetAllServices implements IGetAllServices {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceRepository)
    private serviceRepository: IServiceRepository
  ) {}

  async execute(data: GetServiceListRequestDTO): Promise<GetServiceListResponseDTO> {
    try {
      const { skip, limit, search } = data;
      const Services =
        await this.serviceRepository.getServicesWithProviderDetails(
          skip,
          limit,
          search
        );

        const mappedServices = Services.map((service: IServiceWithProviderDetails) => {
          return {
            _id: service._id?.toString() || "",
            serviceName:service.serviceName,
            description: service.description,
            serviceType: service.serviceType,
            category: service.category.toString(),
            location: service.location,
            estimatedPrice: service.estimatedPrice,
            serviceImage: service.serviceImage,
            serviceProviderId: service.serviceProviderId.toString(),
            isActive: service.isActive,
            serviceProviderDetails: service.serviceProviderDetails ? {
              _id: service.serviceProviderDetails._id?.toString() || "",
              serviceProviderName: service.serviceProviderDetails.serviceProviderName,
              profileImage: service.serviceProviderDetails.profileImage,
              experience: service.serviceProviderDetails.experience,
              phone: service.serviceProviderDetails.serviceProviderPhone,
              email: service.serviceProviderDetails.serviceProviderEmail,
              isActive: !service.serviceProviderDetails.isBlocked,
              createdAt: service.serviceProviderDetails.createdAt || new Date(),
            } : undefined,
          };
        }); 

      const count =
        await this.serviceRepository.getServicesWithProviderDetailsCount();

      console.log(count);

      return { allServices: mappedServices, count };
    } catch (error) {
      console.error("Error adding new service:", error);
      throw new Error("Failed to Fetch services");
    }
  }
}
