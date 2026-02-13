import { SubscriptionPlanResponseDTO } from "../../../../dtos/admin/subscription/SubscriptionPlanDTO";

export interface IGetAllSubscriptionPlansUseCase {
  execute(): Promise<SubscriptionPlanResponseDTO[]>;
}
