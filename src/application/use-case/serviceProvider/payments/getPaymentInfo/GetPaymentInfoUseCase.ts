import { inject, injectable } from "tsyringe";
import { IServiceBookingRepository } from "../../../../../domain/repositories/IserviceBookingRepository";
import { IGetPaymentInfoUseCase } from "./IGetPaymentInfoUseCase";
import { GetPaymentInfoRequestDTO, GetPaymentInfoResponseDTO } from "../../../../dtos/serviceProvider/payment/getPaymentInfo/GetPaymentInfoDTO";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";

@injectable()
export class GetPaymentInfoUseCase implements IGetPaymentInfoUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceBookingRepository)
    private serviceBooking: IServiceBookingRepository,
  ) {}

  async execute(data: GetPaymentInfoRequestDTO): Promise<GetPaymentInfoResponseDTO> {
    const startDate = data.startDate || new Date("1970-01-01");
    const endDate = data.endDate || new Date();

    const res = await this.serviceBooking.getPaymentInfoServiceProvider(
      data.serviceProviderId,
      startDate,
      endDate,
    );

    console.log(res);
    return res;
  }
}
