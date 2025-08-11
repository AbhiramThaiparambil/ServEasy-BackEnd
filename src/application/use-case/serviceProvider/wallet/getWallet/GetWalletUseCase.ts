import { inject, injectable } from 'tsyringe';
import { IProviderWalletRepository } from '../../../../../domain/repositories/IproviderWalletRepository';
import { IProviderWallet } from '../../../../../domain/entities/IproviderWallet';
import { Types } from 'mongoose';
import { REPOSITORY_TOKENS } from '../../../../../utils/constants/tokens';

@injectable()
export class GetWalletUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.WalletRepository)
    private walletRepository: IProviderWalletRepository
  ) {}

  async execute(serviceProviderId: string,limit:number,skip:number,pagination:Boolean): Promise<IProviderWallet| null> {
    return   await this.walletRepository.findProviderWalletWithPaginatedTransactions(new Types.ObjectId(serviceProviderId),limit,skip);

  }
}
