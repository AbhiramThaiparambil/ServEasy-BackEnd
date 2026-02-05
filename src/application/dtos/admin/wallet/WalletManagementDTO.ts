import { IProviderWalletView } from "../../../../utils/types/dto/IProviderWalletView";
import { IProviderWalletDetailsView } from "../../../../utils/types/dto/IProviderWalletDetailsView";

export interface GetWalletListRequestDTO {
  skip: number;
  limit: number;
}

export interface WalletListResponseDTO {
  wallets: IProviderWalletView[];
}

export interface GetWalletByIdRequestDTO {
  providerId: string;
}

export interface WalletDetailsResponseDTO extends IProviderWalletDetailsView {}

export interface WithdrawRequestDTO {
  walletId: string;
  transactionId: string;
  newStatus: "success" | "rejected";
  reason?: string;
}
