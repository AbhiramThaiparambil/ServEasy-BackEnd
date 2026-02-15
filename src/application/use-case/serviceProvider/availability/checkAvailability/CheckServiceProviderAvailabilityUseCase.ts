import { injectable, inject } from "tsyringe";
import { IServiceBookingRepository } from "../../../../../domain/repositories/IserviceBookingRepository";
import { ICheckServiceProviderAvailabilityUseCase } from "./ICheckServiceProviderAvailabilityUseCase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { CheckAvailabilityRequestDTO } from "../../../../dtos/serviceProvider/availability/CheckAvailabilityDTO";

@injectable()
export class CheckServiceProviderAvailabilityUseCase implements ICheckServiceProviderAvailabilityUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceBookingRepository)
    private serviceBookingRepository: IServiceBookingRepository,
  ) {}

  async execute(
   data: CheckAvailabilityRequestDTO
  ):Promise<{ available: boolean; reason?: string }> {

  const availability = await this.serviceBookingRepository.checkAvailability(data.serviceProviderId);
 return availability
  }
}
