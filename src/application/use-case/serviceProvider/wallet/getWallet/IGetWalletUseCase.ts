import { IProviderWallet } from "../../../../../domain/entities/IproviderWallet";

export interface IGetWalletUseCase {
  execute(serviceProviderId: string,limit:number,skip:number,pagination:Boolean): Promise<IProviderWallet | null>;
}