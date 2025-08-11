import { IProviderWalletView } from "../../../../../utils/types/dto/IProviderWalletView";

export interface IGetAllProvidersWalletsUseCase{

    execute(skip:number,limit:number):Promise<IProviderWalletView[]>
}