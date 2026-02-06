import { SubscriptionPlanResponseDTO } from "../../../../dtos/admin/subscription/SubscriptionPlanDTO";

export interface IGetSubscriptionPlansUseCase {
  execute(): Promise<SubscriptionPlanResponseDTO[]>;
}
