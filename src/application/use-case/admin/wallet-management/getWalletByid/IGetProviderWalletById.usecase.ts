import { IProviderWalletDetailsView } from "../../../../../utils/types/dto/IProviderWalletDetailsView";

export interface IGetProviderWalletUseCase {
  execute(providerId: string): Promise<IProviderWalletDetailsView>;
}
