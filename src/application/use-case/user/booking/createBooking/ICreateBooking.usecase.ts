import {
  CreateBookingRequestDTO,
  CreateBookingResponseDTO,
} from "../../../../../application/dtos/user/booking/createBooking/CreateBookingDTO";

export interface ICreateBookingUseCase {
  execute(data: CreateBookingRequestDTO): Promise<CreateBookingResponseDTO["booking"]>;
}
