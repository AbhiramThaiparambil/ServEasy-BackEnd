import { ISubscriptionPlan } from "../../../../domain/entities/ISubscriptionPlan";

export interface ICreateSubscriptionPlanUseCase {
  execute(
    data: Omit<ISubscriptionPlan, "_id" | "createdAt" | "updatedAt">
  ): Promise<ISubscriptionPlan | null>;
}
