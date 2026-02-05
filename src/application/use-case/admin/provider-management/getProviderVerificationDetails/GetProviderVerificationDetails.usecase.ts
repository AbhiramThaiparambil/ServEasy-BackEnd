import { inject, injectable } from "tsyringe";
import { IGetProviderVerificationDetailsUseCase } from "./IGetProviderVerificationDetails.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IServiceProviderRepository } from "../../../../../domain/repositories/IserviceProviderRepository";
import { ProviderResponseDTO } from "../../../../dtos/admin/provider/ProviderResponseDTO";

@injectable()
export class GetProviderVerificationDetailsUseCase
  implements IGetProviderVerificationDetailsUseCase
{
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceProviderRepository)
    private serviceProviderRepository: IServiceProviderRepository
  ) {}

  async execute(providerId: string): Promise<ProviderResponseDTO | null> {
    const provider = await this.serviceProviderRepository.findById(providerId);

    if (!provider) {
      return null;
    }

    return provider as unknown as ProviderResponseDTO;
  }
}
