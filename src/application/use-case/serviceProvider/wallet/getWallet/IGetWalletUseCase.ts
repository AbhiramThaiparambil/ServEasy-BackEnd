import { IProviderWallet } from "../../../../../domain/entities/IproviderWallet";

export interface IGetWalletUseCase {
  execute(serviceProviderId: string,limit:number,skip:number): Promise< {wallet:IProviderWallet|null,count:number} | null>;
}