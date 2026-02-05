import { inject, injectable } from "tsyringe";
import { ServiceProviderRepository } from "../../../../../infrastructure/repositories/ServiceProviderRepository";
import {
  GetServiceProviderInfoRequestDTO,
  GetServiceProviderInfoResponseDTO,
} from "../../../../../application/dtos/user/service/getProviderInfo/GetServiceProviderInfoDTO";
import { IServiceProvider } from "../../../../../domain/entities/IServiceProvider";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IServiceProviderRepository } from "../../../../../domain/repositories/IserviceProviderRepository";

@injectable()
export class GetServiceProviderInfoUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceProviderRepository) private serviceProviderRepository: IServiceProviderRepository,
  ) {}
  async execute(
    data: GetServiceProviderInfoRequestDTO,
  ): Promise<(IServiceProvider & { isProServiceProvider: boolean }) | null> {
    const { userId } = data;
    const result = await this.serviceProviderRepository.findByUserID(userId);
    console.log(result);
    return result;
  }
}
