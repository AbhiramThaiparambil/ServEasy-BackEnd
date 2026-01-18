import { inject, injectable } from "tsyringe";
import { IGetServiceProviderRegistrationDetailsUseCase } from "./IGetServiceProviderRegistrationDetailsUseCase";
import { IServiceProviderRepository } from "../../../../../domain/repositories/IserviceProviderRepository";

@injectable()
export class GetServiceProviderRegistrationDetailsUseCase
  implements IGetServiceProviderRegistrationDetailsUseCase
{
  constructor(
    @inject("IServiceProviderRepository")
    private serviceProviderRepository: IServiceProviderRepository
  ) {}

  async execute(userId: string) {
    const provider =
      await this.serviceProviderRepository.findRegistrationDetailsByUserId(
        userId
      );

    return provider;
  }
}
