import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../../domain/repositories/IuserRepository";
import { userSanitizer } from "../../../../utils/sanitizers/userSanitizer";
import { IProviderWalletRepository } from "../../../../domain/repositories/IproviderWalletRepository";
import { REPOSITORY_TOKENS } from "../../../../utils/constants/tokens";
@injectable()
export class getAllUsersUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository,
    @inject(REPOSITORY_TOKENS.WalletRepository)
    private walletRepository: IProviderWalletRepository
  ) {}
  async execute(skip: number, limit: number, search: string) {
    const users = await this.userRepository.findUsersSkipLimit(
      skip,
      limit,
      search
    );
    const count = await this.userRepository.userCount();

    return { users: users.map(userSanitizer), count };
  }
}
