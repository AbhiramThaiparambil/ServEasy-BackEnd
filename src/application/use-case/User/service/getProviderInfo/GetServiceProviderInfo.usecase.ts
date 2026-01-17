import { inject, injectable } from "tsyringe";
import { ServiceProviderRepository } from "../../../../../infrastructure/repositories/ServiceProviderRepository";
import { IServiceProvider } from "../../../../../domain/entities/IServiceProvider";

@injectable()
export class GetServiceProviderInfoUseCase {
  constructor(
    @inject(ServiceProviderRepository)
    private serviceProviderRepository: ServiceProviderRepository,
  ) {}
  async execute(
    userId: string,
  ): Promise<(IServiceProvider & { isProServiceProvider: boolean }) | null> {
    const data = await this.serviceProviderRepository.findByUserID(userId);
    console.log(data);
    return data;
  }
}
