import { BookedServiceForServiceProviderDTO, GetBookedServiceByIdForServiceProviderResponseDTO, GetBookedServiceByIdForUserResponseDTO, GetBookedServiceByIdRequestDTO } from "../../../../../application/dtos/common/booking/fetchByid/GetBookedServiceByIdDTO";

export interface IGetBookedServiceByIdUseCase {
  getForUser(data: GetBookedServiceByIdRequestDTO): Promise<GetBookedServiceByIdForUserResponseDTO>;

  getForServiceProvider(data: GetBookedServiceByIdRequestDTO): Promise<
  GetBookedServiceByIdForServiceProviderResponseDTO
  >;
}
