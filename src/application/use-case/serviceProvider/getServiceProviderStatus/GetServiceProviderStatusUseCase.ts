import { inject, injectable } from "tsyringe";
import { IGetServiceProviderStatusUseCase } from "./IGetServiceProviderStatusUseCase";
import { IServiceProviderRepository } from "../../../../domain/repositories/IserviceProviderRepository";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";
import { GetServiceProviderStatusRequestDTO } from "../../../dtos/serviceProvider/getServiceProviderStatus/GetServiceProviderStatusRequestDTO";
import { GetServiceProviderStatusResponseDTO } from "../../../dtos/serviceProvider/getServiceProviderStatus/GetServiceProviderStatusResponseDTO";

@injectable()
export class GetServiceProviderStatusUseCase
  implements IGetServiceProviderStatusUseCase
{
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceProviderRepository)
    private serviceProviderRepository: IServiceProviderRepository
  ) {}

  async execute(data: GetServiceProviderStatusRequestDTO): Promise<GetServiceProviderStatusResponseDTO> {
    const provider = await this.serviceProviderRepository.findStatusByUserId(
      data.userId
    );

    if (!provider) {
      return { hasProvider: false };
    }

    return {
      hasProvider: true,
      status: provider.isVerified,
    };
  }
}
