import { inject, injectable } from "tsyringe";

import { IGetServiceProviders } from "./IGetServiceProviders.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IServiceProviderRepository } from "../../../../../domain/repositories/IserviceProviderRepository";
import { IServiceProvider } from "../../../../../domain/entities/IServiceProvider";
import {
  SafeServiceProvider,
  serviceProviderSanitizer,
} from "../../../../../utils/sanitizers/serviceProviderSanitrizer";

@injectable()
export class GetServiceProviders implements IGetServiceProviders {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceProviderRepository)
    private serviceProviderRepository: IServiceProviderRepository
  ) {}
  async execute(
    skip: number,
    limit: number,
    search: string,
    serviceProviderVerfication?: boolean
  ): Promise<{
    data: SafeServiceProvider[] | IServiceProvider[];
    count: number;
  }> {
    const data =
      await this.serviceProviderRepository.findServiceProviderSkipLimit(
        skip,
        limit,
        search
      );
    const count =
      await this.serviceProviderRepository.findServiceProvidersCount();
    if (serviceProviderVerfication) {
      return { data, count };
    } else {
      return { data: data.map(serviceProviderSanitizer), count };
    }
  }
}
