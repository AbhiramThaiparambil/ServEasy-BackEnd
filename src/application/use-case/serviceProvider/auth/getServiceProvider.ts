import { injectable, inject } from "tsyringe";
import { ServiceProviderRepository } from "../../../../infrastructure/repositories/ServiceProviderRepository";
import { IServiceProvider } from "../../../../domain/entities/IServiceProvider";
import { IServiceProviderRepository } from "../../../../domain/repositories/IserviceProviderRepository";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";

@injectable()
export class GetServiceProvider {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceProviderRepository)
    private serviceProviderRepository: IServiceProviderRepository
  ) {}

  async execute(userId: string): Promise<IServiceProvider> {
    const result = await this.serviceProviderRepository.findByUserID(userId);
    console.log(result);
    if (!result) {
      throw new Error("service providr not exist");
    }
    return result;
  }
}
