

import { inject, injectable } from "tsyringe";
import { MongoUserRepository } from "../../../../infrastructure/repositories/UserRepositoriey";
import { UserRepository } from "../../../../domain/repositories/IuserRepository";
import { User } from "../../../../domain/entities/IUser";
@injectable()
export class blockUnblockUsersUseCase {
  constructor(
    @inject(MongoUserRepository) private userRepository: UserRepository
  ) {}

  async blockUser(userId: string): Promise<boolean> {
    return  await this.userRepository.updateUserField(userId, "isBlocked", true);

  }

  async unblockUser(userId: string): Promise<boolean> {
     return await this.userRepository.updateUserField(userId, "isBlocked", false);
   
  }
}
