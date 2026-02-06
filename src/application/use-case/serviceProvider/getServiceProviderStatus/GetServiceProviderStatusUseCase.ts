import { inject, injectable } from "tsyringe";
import { IGetServiceProviderStatusUseCase } from "./IGetServiceProviderStatusUseCase";
import { IServiceProviderRepository } from "../../../../domain/repositories/IserviceProviderRepository";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";

@injectable()
export class GetServiceProviderStatusUseCase
  implements IGetServiceProviderStatusUseCase
{
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceProviderRepository)
    private serviceProviderRepository: IServiceProviderRepository
  ) {}

  async execute(userId: string) {
    const provider = await this.serviceProviderRepository.findStatusByUserId(
      userId
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
