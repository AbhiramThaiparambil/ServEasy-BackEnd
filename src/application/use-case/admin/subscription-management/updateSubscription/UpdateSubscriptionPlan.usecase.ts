import { injectable, inject } from "tsyringe";
import { IUpdateSubscriptionPlanUseCase } from "./IUpdateSubscriptionPlan.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { ISubscriptionPlanRepository } from "../../../../../domain/repositories/ISubscriptionPlanRepository";
import { ISubscriptionPlan } from "../../../../../domain/entities/ISubscriptionPlan";
import { SubscriptionPlanResponseDTO, UpdateSubscriptionPlanRequestDTO } from "../../../../dtos/admin/subscription/SubscriptionPlanDTO";

@injectable()
export class UpdateSubscriptionPlanUseCase
  implements IUpdateSubscriptionPlanUseCase
{
  constructor(
    @inject(REPOSITORY_TOKENS.SubscriptionRepository)
    private readonly subscriptionPlanRepository: ISubscriptionPlanRepository
  ) {}

  async execute(
    id: string,
    data: UpdateSubscriptionPlanRequestDTO
  ): Promise<SubscriptionPlanResponseDTO | null> {
    const planEntity: Partial<ISubscriptionPlan> = { ...data };
    
    const updatedPlan =
      await this.subscriptionPlanRepository.updateSubscriptionPlanById(
        id,
        planEntity
      );

    if (!updatedPlan) return null;

    return {
      _id: updatedPlan._id?.toString() || "",
      name: updatedPlan.name,
      price: updatedPlan.price,
      validityDays: updatedPlan.validityDays,
      features: updatedPlan.features,
      adLimitPerMonth: updatedPlan.adLimitPerMonth,
      payoutSpeedDays: updatedPlan.payoutSpeedDays,
      description: updatedPlan.description,
    };
  }
}
