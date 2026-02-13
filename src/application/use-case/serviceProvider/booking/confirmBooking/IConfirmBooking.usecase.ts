import { ConfirmBookingRequestDTO } from "../../../../dtos/serviceProvider/booking/confirmBooking/ConfirmBookingRequestDTO";
import { ConfirmBookingResponseDTO } from "../../../../dtos/serviceProvider/booking/confirmBooking/ConfirmBookingResponseDTO";

export interface IConfirmBookingUseCase {
  execute(data: ConfirmBookingRequestDTO): Promise<ConfirmBookingResponseDTO>;
}
