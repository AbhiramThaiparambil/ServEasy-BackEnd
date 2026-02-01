import { inject, injectable } from "tsyringe";
import { IServiceBookingRepository } from "../../../domain/repositories/IserviceBookingRepository";
import { IGetPaymentInfoUseCaseServiceProvider } from "./IGetPaymentInfoServiceProvider";
import { REPOSITORY_TOKENS } from "../../../constants/tokens";

@injectable()
export class GetPaymentInfoUseCaseServiceProvider implements IGetPaymentInfoUseCaseServiceProvider {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceBookingRepository)
    private serviceBooking: IServiceBookingRepository,
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
