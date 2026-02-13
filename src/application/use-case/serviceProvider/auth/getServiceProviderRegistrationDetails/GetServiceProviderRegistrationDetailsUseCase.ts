import { inject, injectable } from "tsyringe";
import { IGetServiceProviderRegistrationDetailsUseCase } from "./IGetServiceProviderRegistrationDetailsUseCase";
import { IServiceProviderRepository } from "../../../../../domain/repositories/IserviceProviderRepository";
import { GetRegistrationDetailsRequestDTO } from "../../../../dtos/serviceProvider/auth/ServiceProviderAuthDTO";

@injectable()
export class GetServiceProviderRegistrationDetailsUseCase
  implements IGetServiceProviderRegistrationDetailsUseCase
{
  constructor(
    @inject("IServiceProviderRepository")
    private serviceProviderRepository: IServiceProviderRepository
  ) {}

  async execute(data: GetRegistrationDetailsRequestDTO) {
    const provider =
      await this.serviceProviderRepository.findRegistrationDetailsByUserId(
        data.userId
      );

    return provider;
  }
}
