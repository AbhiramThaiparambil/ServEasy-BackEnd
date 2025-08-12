import { inject, injectable } from "tsyringe";
import {IGetProviderWalletUseCase} from "./IGetProviderWalletById.usecase"
import { REPOSITORY_TOKENS } from "../../../../../utils/constants/tokens";
import { IProviderWalletRepository } from "../../../../../domain/repositories/IproviderWalletRepository";
import { IProviderWalletDetailsView } from "../../../../../utils/types/dto/IProviderWalletDetailsView";
@injectable()
export class GetProviderWalletUseCase implements IGetProviderWalletUseCase{
constructor(@inject(REPOSITORY_TOKENS.WalletRepository)private walletRepo:IProviderWalletRepository ){}
    async execute(providerId:string):Promise<IProviderWalletDetailsView>{
 
      return await  this.walletRepo.findProviderWalletByid(providerId)

    }
}