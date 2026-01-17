import { inject, injectable } from "tsyringe";
import { IServiceRepository } from "../../../../domain/repositories/IServiceRepository";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";

@injectable()
export class ManageAllServiceUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceRepository)
    private servicerepo: IServiceRepository,
  ) {}

  async makeInactiveAllService(serviceProviderId: string): Promise<void> {
    await this.servicerepo.blockAllserviceServiceProvider(serviceProviderId);
  }

  async makeActiveAllService(serviceProviderId: string): Promise<void> {
    await this.servicerepo.activateAllServicesByServiceProvider(
      serviceProviderId,
    );
  }
}
