import { inject, injectable } from 'tsyringe';
import { IProviderWalletRepository } from '../../../../domain/repositories/IproviderWallet';
import { IProviderWallet } from '../../../../domain/entities/IproviderWallet';
import { Types } from 'mongoose';
import { REPOSITORY_TOKENS } from '../../../../utils/constants/tokens';

@injectable()
export class GetWalletUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.WalletRepository)
    private walletRepository: IProviderWalletRepository
  ) {}

  async execute(serviceProviderId: string): Promise<IProviderWallet| null> {
    return   await this.walletRepository.findByProviderId(new Types.ObjectId(serviceProviderId));

  }
}
