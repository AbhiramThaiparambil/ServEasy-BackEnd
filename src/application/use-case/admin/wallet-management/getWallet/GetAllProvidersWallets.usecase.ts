import { inject, injectable } from "tsyringe";
import { IGetAllProvidersWalletsUseCase } from "./IGetAllProvidersWallets.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IProviderWalletRepository } from "../../../../../domain/repositories/IproviderWalletRepository";
import { GetWalletListRequestDTO, WalletListResponseDTO } from "../../../../dtos/admin/wallet/WalletManagementDTO";


@injectable()
export class GetAllProvidersWallets implements IGetAllProvidersWalletsUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.WalletRepository)
    private walletRepository: IProviderWalletRepository
  ) {}

  async execute(request: GetWalletListRequestDTO): Promise<WalletListResponseDTO> {
    const { skip, limit } = request;
    const wallets = await this.walletRepository.findPaginatedProviderWallets(skip, limit);
    return { wallets };
  }
}
