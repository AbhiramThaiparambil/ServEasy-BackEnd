import { inject, injectable } from "tsyringe";
import { ServiceBookingRepository } from "../../../infrastructure/repositories/ServiceBookingRepository";

@injectable()
export class GetPaymentInfoUseCaseServiceProvider {
  constructor(
    @inject(ServiceBookingRepository)
    private serviceBooking: ServiceBookingRepository,
  ) {}

  async execute(
    serviceProviderId: string,
    startDate: Date = new Date("1970-01-01"),
    endDate: Date = new Date(),
  ): Promise<any> {
    const res = await this.serviceBooking.getPaymentInfoServiceProvider(
      serviceProviderId,
      startDate ?? null,
      endDate ?? null,
    );

    console.log(res);
    return res;
  }
}
