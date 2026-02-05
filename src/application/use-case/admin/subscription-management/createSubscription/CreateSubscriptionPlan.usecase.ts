import { inject, injectable } from "tsyringe";
import { ICreateSubscriptionPlanUseCase } from "./ICreateSubscriptionPlan.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { ISubscriptionPlanRepository } from "../../../../../domain/repositories/ISubscriptionPlanRepository";
import { ISubscriptionPlan } from "../../../../../domain/entities/ISubscriptionPlan";
import { CreateSubscriptionPlanRequestDTO, SubscriptionPlanResponseDTO } from "../../../../dtos/admin/subscription/SubscriptionPlanDTO";

@injectable()
export class CreateSubscriptionPlanUseCase
  implements ICreateSubscriptionPlanUseCase
{
  constructor(
    @inject(REPOSITORY_TOKENS.SubscriptionRepository)
    private readonly subscriptionPlanRepository: ISubscriptionPlanRepository
  ) {}

  async execute(
    data: CreateSubscriptionPlanRequestDTO
  ): Promise<SubscriptionPlanResponseDTO | null> {
    
    const planEntity: ISubscriptionPlan = {
      ...data,
      // features: data.features // Assuming direct mapping works 
    } as unknown as ISubscriptionPlan

    const createdPlan =
      await this.subscriptionPlanRepository.createSubscriptionPlan(planEntity);

    if (!createdPlan) return null;

    return {
      _id: createdPlan._id?.toString() || "",
      name: createdPlan.name,
      price: createdPlan.price,
      validityDays: createdPlan.validityDays,
      features: createdPlan.features,
      adLimitPerMonth: createdPlan.adLimitPerMonth,
      payoutSpeedDays: createdPlan.payoutSpeedDays,
      description: createdPlan.description,
    };
  }
}
