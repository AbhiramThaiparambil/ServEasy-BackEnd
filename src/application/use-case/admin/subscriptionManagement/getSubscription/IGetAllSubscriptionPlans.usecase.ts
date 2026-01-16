import { ISubscriptionPlan } from "../../../../domain/entities/ISubscriptionPlan";

export interface IGetAllSubscriptionPlansUseCase {
  execute(): Promise<ISubscriptionPlan[]>;
}
