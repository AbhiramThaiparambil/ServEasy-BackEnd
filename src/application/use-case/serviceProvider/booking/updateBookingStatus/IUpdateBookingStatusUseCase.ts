import { UpdateBookingStatusRequestDTO } from "../../../../dtos/serviceProvider/booking/updateBookingStatus/UpdateBookingStatusRequestDTO";
import { IServiceBooking } from "../../../../../domain/entities/IServiceBooking";

export interface IUpdateBookingStatusUseCase {
  execute(data: UpdateBookingStatusRequestDTO): Promise<IServiceBooking|null>;
}
