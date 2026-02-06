import { inject, injectable } from "tsyringe";
import { IManageServiceProviderSubscriptionsUseCase } from "./IManageServiceProviderSubscriptionsUseCase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { ISubscriptionPlanRepository } from "../../../../../domain/repositories/ISubscriptionPlanRepository";
import { IServiceProviderRepository } from "../../../../../domain/repositories/IserviceProviderRepository";

import { ManageSubscriptionsRequestDTO, ManageSubscriptionsResponseDTO } from "../../../../dtos/serviceProvider/subscription/manageSubscription/ManageSubscriptionsDTO";

@injectable()
export class ManageServiceProviderSubscriptionsUseCase
  implements IManageServiceProviderSubscriptionsUseCase
{
  constructor(
    @inject(REPOSITORY_TOKENS.SubscriptionRepository)
    private subscriptionRepository: ISubscriptionPlanRepository,
    @inject(REPOSITORY_TOKENS.ServiceProviderRepository)
    private serviceProviderRepo: IServiceProviderRepository
  ) {}

  async execute(data?: ManageSubscriptionsRequestDTO): Promise<ManageSubscriptionsResponseDTO> {
    const count = await this.serviceProviderRepo.expireSubscriptions();
    return { processedCount: count };
  }
}
