

import { ManageSubscriptionsRequestDTO, ManageSubscriptionsResponseDTO } from "../../../../dtos/serviceProvider/subscription/manageSubscription/ManageSubscriptionsDTO";

export interface IManageServiceProviderSubscriptionsUseCase {
  execute(data?: ManageSubscriptionsRequestDTO): Promise<ManageSubscriptionsResponseDTO>;
}