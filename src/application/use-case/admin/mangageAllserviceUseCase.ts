import { inject, injectable } from "tsyringe";
import { ServiceRepository } from "../../../infrastructure/repositories/ServiceRepositorie";

@injectable()
export class ManageAllServiceUseCase {
  constructor(
    @inject(ServiceRepository) private servicerepo: ServiceRepository
  ) {}

  async makeInactiveAllService(serviceProviderId: string): Promise<void> {
    await this.servicerepo.blockAllserviceServiceProvider(serviceProviderId);
  }

  async makeActiveAllService(serviceProviderId: string): Promise<void> {
    await this.servicerepo.activateAllServicesByServiceProvider(serviceProviderId);
  }
}
