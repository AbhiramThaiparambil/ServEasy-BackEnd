import { inject, injectable } from "tsyringe";
import { ServiceProviderRepository } from "../../../../../infrastructure/repositories/ServiceProviderRepository";
import {
  SafeServiceProvider,
  serviceProviderSanitizer,
} from "../../../../../utils/sanitizers/serviceProviderSanitrizer";
import { IServiceProviderRepository } from "../../../../../domain/repositories/IserviceProviderRepository";
import { IGetServiceProviders } from "./IGetServiceProviders.usecase";
import { IServiceProvider } from "../../../../../domain/entities/IServiceProvider";

@injectable()
export class GetServiceProviders implements IGetServiceProviders {
  constructor(
    @inject(ServiceProviderRepository)
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
