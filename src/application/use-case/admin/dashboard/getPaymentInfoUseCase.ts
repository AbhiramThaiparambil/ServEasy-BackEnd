import { inject, injectable } from "tsyringe";
import { ServiceBookingRepository } from "../../../../infrastructure/repositories/ServiceBookingRepository";

@injectable()
export class GetPaymentInfoUseCase {
  constructor(
    @inject(ServiceBookingRepository)
    private serviceBooking: ServiceBookingRepository,
  ) {}

  async execute(
    startDate: Date = new Date("1970-01-01"),
    endDate: Date = new Date(),
  ) {
    return await this.serviceBooking.getPaymentInfo(
      startDate ?? null,
      endDate ?? null,
    );
  }
}
