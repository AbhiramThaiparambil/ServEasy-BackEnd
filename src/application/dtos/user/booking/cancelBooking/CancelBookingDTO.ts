import { IServiceBooking } from "../../../../../domain/entities/IServiceBooking";

export interface CancelBookingRequestDTO {
  bookingId: string;
  status: string;
  reason: string;
}

export interface CancelBookingResponseDTO {
  booking: IServiceBooking | null;
}
