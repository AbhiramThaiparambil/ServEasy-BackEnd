import { injectable, inject } from "tsyringe";
import { IGetSubscriptionPlansUseCase } from "./IGetSubscriptionPlansUseCase";
import { ISubscriptionPlanRepository } from "../../../../../domain/repositories/ISubscriptionPlanRepository";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { SubscriptionPlanResponseDTO } from "../../../../dtos/admin/subscription/SubscriptionPlanDTO";

@injectable()
export class GetSubscriptionPlansUseCase implements IGetSubscriptionPlansUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.SubscriptionRepository)
    private subscriptionPlanRepository: ISubscriptionPlanRepository
  ) {}

  async execute(): Promise<SubscriptionPlanResponseDTO[]> {
    const plans = await this.subscriptionPlanRepository.findAllSubscriptionPlans();
    return plans.map((plan) => ({
      _id: plan._id?.toString() || "",
      name: plan.name,
      price: plan.price,
      validityDays: plan.validityDays,
      features: plan.features,
      adLimitPerMonth: plan.adLimitPerMonth,
      payoutSpeedDays: plan.payoutSpeedDays,
      description: plan.description,
    }));
  }
}
