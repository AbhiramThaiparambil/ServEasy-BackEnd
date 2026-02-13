import { GetWalletRequestDTO } from "../../../../dtos/serviceProvider/wallet/getWallet/GetWalletRequestDTO";
import { GetWalletResponseDTO } from "../../../../dtos/serviceProvider/wallet/getWallet/GetWalletResponseDTO";

export interface IGetWalletUseCase {
  execute(data: GetWalletRequestDTO): Promise<GetWalletResponseDTO | null>;
}