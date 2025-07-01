
import { injectable, inject } from "tsyringe";
import { ServiceBookingRepository } from "../../../infrastructure/repositories/ServiceBookingRepository";
import { Types } from "mongoose";

@injectable()
export class checkServiceProviderAvailabilityUseCase {
  constructor(
    @inject(ServiceBookingRepository)
    private serviceBookingRepository: ServiceBookingRepository
  ) {}

  async execute(
   serviceProviderId: string,
  ) {

  const availability = await this.serviceBookingRepository.checkAvailability(new Types.ObjectId(serviceProviderId));
 return availability
  }
}
