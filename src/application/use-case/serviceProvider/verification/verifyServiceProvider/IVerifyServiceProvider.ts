import { VerifyServiceProviderRequestDTO, VerifyServiceProviderResponseDTO } from "../../../../dtos/serviceProvider/verification/verifyServiceProvider/VerifyServiceProviderDTO";

export interface IVerifyServiceProvider {
  execute(data: VerifyServiceProviderRequestDTO): Promise<VerifyServiceProviderResponseDTO>;
}
