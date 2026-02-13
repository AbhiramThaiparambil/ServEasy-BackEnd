import {
  IFindPaymentInfoAdminDTO,
  IFindPaymentInfoAdminRequestDTO,
} from "../../../dtos/admin/bookings/GetAdminBookingHistoryDTO";

export interface IGetAdminBookingHistoryUseCase {
  execute(
    data: IFindPaymentInfoAdminRequestDTO,
  ): Promise<IFindPaymentInfoAdminDTO[]>;
}
