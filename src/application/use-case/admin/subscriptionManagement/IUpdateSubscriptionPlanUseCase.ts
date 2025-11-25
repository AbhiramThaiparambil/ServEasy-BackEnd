import { ISubscriptionPlan } from "../../../../domain/entities/ISubscriptionPlan";

export interface IUpdateSubscriptionPlanUseCase {
  execute(
    id: string,
    data: Partial<
      Omit<ISubscriptionPlan, '_id' | 'createdAt' | 'updatedAt'>
    >
  ): Promise<ISubscriptionPlan | null>;
}
