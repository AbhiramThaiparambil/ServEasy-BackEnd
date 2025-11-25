import { ISubscriptionPlan } from "../../domain/entities/ISubscriptionPlan";

export interface ISubscriptionPlanRepository {
  createSubscriptionPlan(plan: ISubscriptionPlan): Promise<ISubscriptionPlan|null>;
  findSubscriptionPlanById(id: string): Promise<ISubscriptionPlan | null>;
  findAllSubscriptionPlans(): Promise<ISubscriptionPlan[]>;
  updateSubscriptionPlanById(id: string, data: Partial<ISubscriptionPlan>): Promise<ISubscriptionPlan | null>;
  deleteSubscriptionPlanById(id: string): Promise<boolean>;
}
