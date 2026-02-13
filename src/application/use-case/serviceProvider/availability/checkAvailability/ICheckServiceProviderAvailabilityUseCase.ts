import { CheckAvailabilityRequestDTO } from "../../../../dtos/serviceProvider/availability/CheckAvailabilityDTO";

export interface ICheckServiceProviderAvailabilityUseCase {
  execute(data: CheckAvailabilityRequestDTO): Promise<{ available: boolean; reason?: string }>;
}
