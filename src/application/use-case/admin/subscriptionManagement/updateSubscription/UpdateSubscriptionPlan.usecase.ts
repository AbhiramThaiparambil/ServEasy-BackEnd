import { injectable, inject } from "tsyringe";
import { IUpdateSubscriptionPlanUseCase } from "./IUpdateSubscriptionPlan.usecase";
import { ISubscriptionPlan } from "../../../../../domain/entities/ISubscriptionPlan";
import { ISubscriptionPlanRepository } from "../../../../../domain/repositories/ISubscriptionPlanRepository";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";

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
    data: Partial<Omit<ISubscriptionPlan, "_id" | "createdAt" | "updatedAt">>
  ): Promise<ISubscriptionPlan | null> {
    console.log(
      "++++++++++++++++++++++++++++++++============++++++++++++++++++++++++"
    );
    console.log(data);
    const updatedPlan =
      await this.subscriptionPlanRepository.updateSubscriptionPlanById(
        id,
        data
      );

    return updatedPlan;
  }
}
