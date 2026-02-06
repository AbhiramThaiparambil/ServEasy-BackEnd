import { GetServiceProviderStatusRequestDTO } from "../../../dtos/serviceProvider/getServiceProviderStatus/GetServiceProviderStatusRequestDTO";
import { GetServiceProviderStatusResponseDTO } from "../../../dtos/serviceProvider/getServiceProviderStatus/GetServiceProviderStatusResponseDTO";

export interface IGetServiceProviderStatusUseCase {
  execute(data: GetServiceProviderStatusRequestDTO): Promise<GetServiceProviderStatusResponseDTO>;
}
