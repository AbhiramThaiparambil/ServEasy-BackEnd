import { GetProvidersDTO } from "../../../../dtos/admin/provider/GetProvidersDTO";
import { ProviderResponseDTO } from "../../../../dtos/admin/provider/ProviderResponseDTO";

export interface IGetServiceProviders {
  execute(data: GetProvidersDTO): Promise<{
    data: ProviderResponseDTO[];
    count: number;
  }>;
}
