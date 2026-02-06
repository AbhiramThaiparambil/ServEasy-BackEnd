import { IAddress } from "../../../../../domain/entities/IAddress";
import { IPreferredServiceDateTime, IliveLocation, IServiceBooking } from "../../../../../domain/entities/IServiceBooking";

export interface CreateBookingRequestDTO {
  userId: string;
  serviceId: string;
  address: IAddress;
  preferredServiceTime: IPreferredServiceDateTime;
  liveLocation?: IliveLocation;
}

export interface CreateBookingResponseDTO {
  booking: IServiceBooking;
}
