import { UpdateBookingStatusRequestDTO } from "../../../../dtos/serviceProvider/booking/updateBookingStatus/UpdateBookingStatusRequestDTO";

export interface IUpdateBookingStatusUseCase {
  execute(data: UpdateBookingStatusRequestDTO): Promise<any>;
}
