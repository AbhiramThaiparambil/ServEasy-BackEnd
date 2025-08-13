import { inject, injectable } from 'tsyringe';
import { IProviderWalletRepository } from '../../../../../domain/repositories/IproviderWalletRepository';
import { IProviderWallet } from '../../../../../domain/entities/IproviderWallet';
import { Types } from 'mongoose';
import { REPOSITORY_TOKENS } from '../../../../../utils/constants/tokens';
import { IGetWalletUseCase } from './IGetWalletUseCase';

@injectable()
export class GetWalletUseCase implements IGetWalletUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.WalletRepository)
    private walletRepository: IProviderWalletRepository
  ) {}

  async execute(serviceProviderId: string,limit:number,skip:number,): Promise<{wallet:IProviderWallet|null,count:number}> {
  const wallet = await this.walletRepository.findProviderWalletWithPaginatedTransactions(new Types.ObjectId(serviceProviderId),limit,skip);
  const count= await this.walletRepository.findCountOfTransactions(serviceProviderId)
return {wallet,count}      
}


}
