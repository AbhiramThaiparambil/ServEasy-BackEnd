import { injectable, inject } from "tsyringe";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IServiceProviderRepository } from "../../../../../domain/repositories/IserviceProviderRepository";
import { IServiceProvider } from "../../../../../domain/entities/IServiceProvider";
import { IGetServiceProvider } from "./IGetServiceProvider";

@injectable()
export class GetServiceProvider implements IGetServiceProvider {
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
