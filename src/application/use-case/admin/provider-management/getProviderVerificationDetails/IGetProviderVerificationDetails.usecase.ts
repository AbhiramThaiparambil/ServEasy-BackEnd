import { ProviderResponseDTO } from "../../../../dtos/admin/provider/ProviderResponseDTO";

export interface IGetProviderVerificationDetailsUseCase {
  execute(providerId: string): Promise<ProviderResponseDTO | null>;
}
