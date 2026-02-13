import { inject, injectable } from "tsyringe";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";
import { IServiceBookingRepository } from "../../../../domain/repositories/IserviceBookingRepository";
import { IGetPaymentInfoUseCase } from "./IGetPaymentInfo.usecase";
import { GetPaymentInfoResponseDTO } from "../../../dtos/serviceProvider/payment/getPaymentInfo/GetPaymentInfoDTO";

@injectable()
export class GetPaymentInfoUseCase implements IGetPaymentInfoUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceBookingRepository)
    private serviceBooking: IServiceBookingRepository,
  ) {}

  async execute(
    startDate: Date = new Date("2026-01-01"),
    endDate: Date = new Date(),
  ): Promise<GetPaymentInfoResponseDTO> {
    const res = await this.serviceBooking.getPaymentInfo(
      startDate ?? null,
      endDate ?? null,
    );
    return {
      count:res.count,
      totalRevenue:res.totalRevenue,
      totalConvenienceFee:res.totalConvenienceFee
    }
  }
}
