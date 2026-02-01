import { inject, injectable } from "tsyringe";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";
import { IServiceBookingRepository } from "../../../../domain/repositories/IserviceBookingRepository";
import { IGetPaymentInfoUseCase } from "./IGetPaymentInfo.usecase";

@injectable()
export class GetPaymentInfoUseCase implements IGetPaymentInfoUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceBookingRepository)
    private serviceBooking: IServiceBookingRepository,
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
