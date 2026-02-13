import { inject, injectable } from "tsyringe";
import { IGetAdminBookingHistoryUseCase } from "./IGetAdminBookingHistory.usecase";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";
import { IServiceBookingRepository } from "../../../../domain/repositories/IserviceBookingRepository";
import {
  IFindPaymentInfoAdminDTO,
  IFindPaymentInfoAdminRequestDTO,
} from "../../../dtos/admin/bookings/GetAdminBookingHistoryDTO";

@injectable()
export class GetAdminBookingHistoryUseCase implements IGetAdminBookingHistoryUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceBookingRepository)
    private serviceBookingRepository: IServiceBookingRepository,
  ) {}
  async execute(
    data: IFindPaymentInfoAdminRequestDTO,
  ): Promise<IFindPaymentInfoAdminDTO[]> {
    const { limit, skip, search, status, statusField } = data;

    const bookingHistory =
      await this.serviceBookingRepository.findPaymentInfoAdmin(
        skip,
        limit,
        search,
        status,
        statusField,
      );
    return bookingHistory;
  }
}
