import { injectable, inject } from "tsyringe";
import { IGetAllSubscriptionPlansUseCase } from "./IGetAllSubscriptionPlans.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { ISubscriptionPlanRepository } from "../../../../../domain/repositories/ISubscriptionPlanRepository";
import { SubscriptionPlanResponseDTO } from "../../../../dtos/admin/subscription/SubscriptionPlanDTO";

@injectable()
export class GetAllSubscriptionPlansUseCase
  implements IGetAllSubscriptionPlansUseCase
{
  constructor(
    @inject(REPOSITORY_TOKENS.SubscriptionRepository)
    private readonly subscriptionPlanRepository: ISubscriptionPlanRepository
  ) {}

  async execute(): Promise<SubscriptionPlanResponseDTO[]> {
    const plans =
      await this.subscriptionPlanRepository.findAllSubscriptionPlans();

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
