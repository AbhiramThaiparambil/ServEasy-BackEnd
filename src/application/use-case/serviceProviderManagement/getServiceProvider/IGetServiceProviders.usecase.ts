import { IServiceProvider } from "../../../../domain/entities/IServiceProvider";
import { SafeServiceProvider } from "../../../../utils/sanitizers/serviceProviderSanitrizer";

export interface IGetServiceProviders {
  execute(
    skip: number,
    limit: number,
    search: string,
    serviceProviderVerfication?: boolean
  ): Promise<{
    data: SafeServiceProvider[] | IServiceProvider[];
    count: number;
  }>;
}
