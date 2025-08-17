import { injectable, inject } from "tsyringe";
import { ISubscriptionPlan } from "../../../domain/entities/ISubscriptionPlan";
import { ISubscriptionPlanRepository } from "../../../domain/repositories/ISubscriptionPlanRepository";
import { IGetSubscriptionPlansUseCase } from "./IGetSubscriptionPlansUseCase";

@injectable()
export class GetSubscriptionPlansUseCase implements IGetSubscriptionPlansUseCase {
  constructor(
    @inject("ISubscriptionPlanRepository")
    private subscriptionPlanRepository: ISubscriptionPlanRepository
  ) {}

  async execute(): Promise<ISubscriptionPlan[]> {
    return await this.subscriptionPlanRepository.findAllSubscriptionPlans();
  }
}
