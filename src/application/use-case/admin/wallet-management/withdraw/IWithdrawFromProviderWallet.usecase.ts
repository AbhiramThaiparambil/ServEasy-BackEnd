import { WithdrawRequestDTO } from "../../../../dtos/admin/wallet/WalletManagementDTO";


export interface IWithdrawFromProviderWalletUseCase {
  execute(data: WithdrawRequestDTO): Promise<boolean>;
}