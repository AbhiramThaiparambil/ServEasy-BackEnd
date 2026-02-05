import { GetServiceProviderInfoRequestDTO, GetServiceProviderInfoResponseDTO } from "../../../../../application/dtos/user/service/getProviderInfo/GetServiceProviderInfoDTO";

export interface IGetServiceProviderInfoUseCase {
  execute(
    data: GetServiceProviderInfoRequestDTO,
  ): Promise<GetServiceProviderInfoResponseDTO["provider"]>;
}