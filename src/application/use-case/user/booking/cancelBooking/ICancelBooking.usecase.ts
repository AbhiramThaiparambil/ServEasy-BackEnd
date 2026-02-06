import {
  CancelBookingRequestDTO,
  CancelBookingResponseDTO,
} from "../../../../../application/dtos/user/booking/cancelBooking/CancelBookingDTO";

export interface ICancelBookingUseCase {
  execute(data: CancelBookingRequestDTO): Promise<CancelBookingResponseDTO["booking"]>;
}
