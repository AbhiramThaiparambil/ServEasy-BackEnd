import { IProviderWallet } from "../../../../domain/entities/IproviderWallet";

export interface IGetWalletUseCase {
  execute(serviceProviderId: string): Promise<IProviderWallet | null>;
}