import { injectable, inject } from "tsyringe";
import { IServiceBookingRepository } from "../../../../../domain/repositories/IserviceBookingRepository";
import { Types } from "mongoose";
import { ICheckServiceProviderAvailabilityUseCase } from "./ICheckServiceProviderAvailabilityUseCase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";

@injectable()
export class CheckServiceProviderAvailabilityUseCase implements ICheckServiceProviderAvailabilityUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceBookingRepository)
    private serviceBookingRepository: IServiceBookingRepository,
  ) {}

  async execute(
   serviceProviderId: string,
  ) {

  const availability = await this.serviceBookingRepository.checkAvailability(new Types.ObjectId(serviceProviderId));
 return availability
  }
}
