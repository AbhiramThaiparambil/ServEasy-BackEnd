import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../../domain/repositories/IuserRepository";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";
@injectable()
export class blockUnblockUsersUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository
  ) {}

  async blockUser(userId: string): Promise<boolean> {
    return await this.userRepository.updateUserField(userId, "isBlocked", true);
  }

  async unblockUser(userId: string): Promise<boolean> {
    return await this.userRepository.updateUserField(
      userId,
      "isBlocked",
      false
    );
  }
}
