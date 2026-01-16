import { IWithdrawFromProviderWallet } from "../../../../utils/types/dto/IWithdrawFromProviderWallet";


export interface IWithdrawFromProviderWalletUseCase {
  execute(data: IWithdrawFromProviderWallet): Promise<boolean>;
}