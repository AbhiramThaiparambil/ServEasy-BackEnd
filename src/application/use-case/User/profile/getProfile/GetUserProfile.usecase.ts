import { inject, injectable } from "tsyringe";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IUserRepository } from "../../../../../domain/repositories/IuserRepository";
import {
  SafeUser,
  userSanitizer,
} from "../../../../../utils/sanitizers/userSanitizer";
import { IGetUserProfileUseCase } from "./IGetUserProfile.usecase";

@injectable()
export class GetUserProfileUseCase implements IGetUserProfileUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository,
  ) {}
  async execute(userId: string): Promise<SafeUser | null> {
    const data = await this.userRepository.findById(userId);
    if (!data) return data;

    return userSanitizer(data);
  }
}
