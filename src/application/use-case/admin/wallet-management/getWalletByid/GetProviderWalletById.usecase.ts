import { inject, injectable } from "tsyringe";
import { IGetProviderWalletUseCase } from "./IGetProviderWalletById.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IProviderWalletRepository } from "../../../../../domain/repositories/IproviderWalletRepository";
import { GetWalletByIdRequestDTO, WalletDetailsResponseDTO } from "../../../../dtos/admin/wallet/WalletManagementDTO";

@injectable()
export class GetProviderWalletUseCase implements IGetProviderWalletUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.WalletRepository)
    private walletRepo: IProviderWalletRepository
  ) {}
  async execute(request: GetWalletByIdRequestDTO): Promise<WalletDetailsResponseDTO> {
    const { providerId } = request;
    return await this.walletRepo.findProviderWalletByid(providerId);
  }
}
