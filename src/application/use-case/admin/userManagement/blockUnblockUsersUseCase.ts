

import { inject, injectable } from "tsyringe";
import {IUserRepository  } from "../../../../domain/repositories/IuserRepository";
@injectable()
export class blockUnblockUsersUseCase {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async blockUser(userId: string): Promise<boolean> {
    return  await this.userRepository.updateUserField(userId, "isBlocked", true);

  }

  async unblockUser(userId: string): Promise<boolean> {
     return await this.userRepository.updateUserField(userId, "isBlocked", false);
   
  }
}
