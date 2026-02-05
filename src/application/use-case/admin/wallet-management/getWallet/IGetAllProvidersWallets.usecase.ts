import { GetWalletListRequestDTO, WalletListResponseDTO } from "../../../../dtos/admin/wallet/WalletManagementDTO";

export interface IGetAllProvidersWalletsUseCase {
  execute(request: GetWalletListRequestDTO): Promise<WalletListResponseDTO>;
}
