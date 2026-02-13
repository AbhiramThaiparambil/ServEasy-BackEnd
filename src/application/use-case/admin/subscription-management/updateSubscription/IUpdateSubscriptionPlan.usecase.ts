import { SubscriptionPlanResponseDTO, UpdateSubscriptionPlanRequestDTO } from "../../../../dtos/admin/subscription/SubscriptionPlanDTO";

export interface IUpdateSubscriptionPlanUseCase {
  execute(
    id: string,
    data: UpdateSubscriptionPlanRequestDTO
  ): Promise<SubscriptionPlanResponseDTO | null>;
}
