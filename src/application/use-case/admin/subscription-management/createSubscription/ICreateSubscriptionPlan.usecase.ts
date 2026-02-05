import { CreateSubscriptionPlanRequestDTO, SubscriptionPlanResponseDTO } from "../../../../dtos/admin/subscription/SubscriptionPlanDTO";

export interface ICreateSubscriptionPlanUseCase {
  execute(
    data: CreateSubscriptionPlanRequestDTO
  ): Promise<SubscriptionPlanResponseDTO | null>;
}
