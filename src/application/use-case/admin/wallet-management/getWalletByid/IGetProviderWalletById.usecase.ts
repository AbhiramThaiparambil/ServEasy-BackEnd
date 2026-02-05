import { GetWalletByIdRequestDTO, WalletDetailsResponseDTO } from "../../../../dtos/admin/wallet/WalletManagementDTO";

export interface IGetProviderWalletUseCase {
  execute(request: GetWalletByIdRequestDTO): Promise<WalletDetailsResponseDTO>;
}
