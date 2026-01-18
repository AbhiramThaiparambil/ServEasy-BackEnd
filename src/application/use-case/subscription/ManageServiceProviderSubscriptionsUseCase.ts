import { inject, injectable } from "tsyringe";
import { IManageServiceProviderSubscriptionsUseCase } from "./IManageServiceProviderSubscriptionsUseCase";
import { REPOSITORY_TOKENS } from "../../../constants/tokens";
import { ISubscriptionPlanRepository } from "../../../domain/repositories/ISubscriptionPlanRepository";
import { IServiceProviderRepository } from "../../../domain/repositories/IserviceProviderRepository";

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

  async execute(): Promise<number> {
    return this.serviceProviderRepo.expireSubscriptions();
  }
}
