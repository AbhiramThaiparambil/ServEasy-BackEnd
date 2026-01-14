import { inject, injectable } from "tsyringe";
import { ICreateSubscriptionPlanUseCase } from "./ICreateSubscriptionPlanUseCase";
import { ISubscriptionPlanRepository } from "../../../../domain/repositories/ISubscriptionPlanRepository";
import { ISubscriptionPlan } from "../../../../domain/entities/ISubscriptionPlan";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";

@injectable()
export class CreateSubscriptionPlanUseCase
  implements ICreateSubscriptionPlanUseCase
{
  constructor(
    @inject(REPOSITORY_TOKENS.SubscriptionRepository)
    private readonly subscriptionPlanRepository: ISubscriptionPlanRepository
  ) {}

  async execute(
    data: Omit<ISubscriptionPlan, "_id" | "createdAt" | "updatedAt">
  ): Promise<ISubscriptionPlan | null> {
    const createdPlan =
      await this.subscriptionPlanRepository.createSubscriptionPlan(data);

    return createdPlan;
  }
}
