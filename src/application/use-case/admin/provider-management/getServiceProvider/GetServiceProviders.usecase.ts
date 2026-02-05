import { inject, injectable } from "tsyringe";

import { IGetServiceProviders } from "./IGetServiceProviders.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IServiceProviderRepository } from "../../../../../domain/repositories/IserviceProviderRepository";
import { GetProvidersDTO } from "../../../../dtos/admin/provider/GetProvidersDTO";
import { ProviderResponseDTO } from "../../../../dtos/admin/provider/ProviderResponseDTO";
import { serviceProviderSanitizer } from "../../../../../utils/sanitizers/serviceProviderSanitrizer";
import { IServiceProvider } from "../../../../../domain/entities/IServiceProvider";

@injectable()
export class GetServiceProviders implements IGetServiceProviders {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceProviderRepository)
    private serviceProviderRepository: IServiceProviderRepository
  ) {}
  async execute(
    data: GetProvidersDTO
  ): Promise<{
    data: ProviderResponseDTO[];
    count: number;
  }> {


    const providers =
      await this.serviceProviderRepository.findServiceProviderSkipLimit(
        data.skip,
        data.limit,
        data.search
      );
    const count =
      await this.serviceProviderRepository.findServiceProvidersCount();
    
    const mappedData: ProviderResponseDTO[] = providers.map((sp: IServiceProvider) => {
      return {
        _id: sp._id?.toString(),
        userId: sp.userId.toString(),
        serviceProviderName: sp.serviceProviderName,
        serviceProviderEmail: sp.serviceProviderEmail,
        serviceProviderPhone: sp.serviceProviderPhone,
        description: sp.description,
        experience: sp.experience,
        profileImage: sp.profileImage,
        isVerified: sp.isVerified || "pending",
        createdAt: sp.createdAt,
        location: sp.location || "",
        services: sp.services || [],
        isBlocked: sp.isBlocked,
        document: sp.document,
        skills: sp.skills,
        bankDetails: sp.bankDetails,
        businessType: sp.businessType,
        category: sp.category,
        subcategory: sp.subcategory,
        serviceMode: sp.serviceMode,
        socialMedia: sp.socialMedia,
        subscriptions:sp.subscriptions
      };
    });


    return { data: mappedData as ProviderResponseDTO[], count };
  }
}
