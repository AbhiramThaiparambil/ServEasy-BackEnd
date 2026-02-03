import { ISubscriptionPlan } from "../../../../domain/entities/ISubscriptionPlan";

export interface IGetSubscriptionPlansUseCase {
  execute(): Promise<ISubscriptionPlan[]>;
}
