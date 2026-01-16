import { inject, injectable } from "tsyringe";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IUserRepository } from "../../../../../domain/repositories/IuserRepository";
import { IBlockUnblockUsers } from "./IBlockUnblockUsers.usecase";

@injectable()
export class BlockUnblockUsers implements IBlockUnblockUsers {
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
