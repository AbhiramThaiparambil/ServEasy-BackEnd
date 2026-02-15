import { inject, injectable } from "tsyringe";
import { IProviderWalletRepository } from "../../../../../domain/repositories/IproviderWalletRepository";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IGetWalletUseCase } from "./IGetWalletUseCase";
import { GetWalletRequestDTO } from "../../../../dtos/serviceProvider/wallet/getWallet/GetWalletRequestDTO";
import { GetWalletResponseDTO } from "../../../../dtos/serviceProvider/wallet/getWallet/GetWalletResponseDTO";

@injectable()
export class GetWalletUseCase implements IGetWalletUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.WalletRepository)
    private walletRepository: IProviderWalletRepository
  ) {}

  async execute(data: GetWalletRequestDTO): Promise<GetWalletResponseDTO | null> {
    const wallet =
      await this.walletRepository.findProviderWalletWithPaginatedTransactions(
        data.serviceProviderId,
        data.limit,
        data.skip
      );
    
    if (!wallet) {
      return null;
    }
    
    const count = await this.walletRepository.findCountOfTransactions(
      data.serviceProviderId
    );
    
    return {
      _id: wallet.serviceProviderId?.toString(),
      serviceProviderId: wallet.serviceProviderId?.toString() || "",
      balance: wallet.balance,
      transactions: wallet.transactions?.map(tx => ({
        amount: tx.amount,
        type: tx.type,
        status: tx.status || "none",
        date: tx.date || new Date(),
        note: tx.note || undefined
      })) || [],
      totalTransactions: count
    };
  }
}
