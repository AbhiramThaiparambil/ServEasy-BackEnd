import { injectable, inject } from "tsyringe";
import { IGetSubscriptionPlansUseCase } from "./IGetSubscriptionPlansUseCase";
import { ISubscriptionPlanRepository } from "../../../../domain/repositories/ISubscriptionPlanRepository";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";
import { ISubscriptionPlan } from "../../../../domain/entities/ISubscriptionPlan";

@injectable()
export class GetSubscriptionPlansUseCase implements IGetSubscriptionPlansUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.SubscriptionRepository)
    private subscriptionPlanRepository: ISubscriptionPlanRepository
  ) {}

  async execute(): Promise<ISubscriptionPlan[]> {
    return await this.subscriptionPlanRepository.findAllSubscriptionPlans();
  }
}
