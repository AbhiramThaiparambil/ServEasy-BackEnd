import { inject, injectable } from "tsyringe";

import { IBlockUnblockUsers } from "./IBlockUnblockUsers.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IUserRepository } from "../../../../../domain/repositories/IuserRepository";
import { BlockUnblockUserRequestDTO } from "../../../../dtos/admin/user/UserManagementDTO";

@injectable()
export class BlockUnblockUsers implements IBlockUnblockUsers {
  constructor(
    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository
  ) {}

  async execute(request: BlockUnblockUserRequestDTO): Promise<boolean> {
    const { userId, action } = request;
    if (action === "Block") {
      return await this.userRepository.updateUserField(userId, "isBlocked", true);
    } else {
      return await this.userRepository.updateUserField(userId, "isBlocked", false);
    }
  }
}
