import { IServiceBooking } from "../../../../../domain/entities/IServiceBooking";

export interface CreateOnlineBookingRequestDTO {
  userId: string;
  serviceId: string;
  slotId: string;
}

export interface CreateOnlineBookingResponseDTO {
  booking: IServiceBooking;
}
