import { ProviderResponseDTO } from "../../../../dtos/admin/provider/ProviderResponseDTO";
import { RejectProviderDTO } from "../../../../dtos/admin/provider/RejectProviderDTO";
import { VerifyProviderDTO } from "../../../../dtos/admin/provider/VerifyProviderDTO";

export interface IServiceProviderRejectVerify {
  rejectServiceProvider(data: RejectProviderDTO): Promise<ProviderResponseDTO | null>;
  verifyServiceProvider(data: VerifyProviderDTO): Promise<ProviderResponseDTO | null>;
}
