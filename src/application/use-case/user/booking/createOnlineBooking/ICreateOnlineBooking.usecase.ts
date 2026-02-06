import {
  CreateOnlineBookingRequestDTO,
  CreateOnlineBookingResponseDTO,
} from "../../../../../application/dtos/user/booking/createOnlineBooking/CreateOnlineBookingDTO";

export interface ICreateOnlineBookingUseCase {
  execute(data: CreateOnlineBookingRequestDTO): Promise<CreateOnlineBookingResponseDTO["booking"]>;
}
