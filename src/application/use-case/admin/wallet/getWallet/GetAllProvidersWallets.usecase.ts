import { inject, injectable } from "tsyringe";
import  {IGetAllProvidersWalletsUseCase} from "./IGetAllProvidersWallets.usecase"
import { REPOSITORY_TOKENS } from "../../../../../utils/constants/tokens";
import { IProviderWalletRepository } from "../../../../../domain/repositories/IproviderWalletRepository";
import { IProviderWalletView } from "../../../../../utils/types/dto/IProviderWalletView";

@injectable()
export class GetAllProvidersWallets implements IGetAllProvidersWalletsUseCase{

constructor(@inject(REPOSITORY_TOKENS.WalletRepository)private walletRepository:IProviderWalletRepository ){}

    async execute(skip:number,limit:number): Promise<IProviderWalletView[]> {
     return  this.walletRepository.findPaginatedProviderWallets(skip,limit)


 }

}
