import { inject, injectable } from "tsyringe";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";
import { SafeUser, userSanitizer } from "../../../../utils/sanitizers/userSanitizer";
import { IUserRepository } from "../../../../domain/repositories/IuserRepository";
import { IGetAdminProfileUseCase } from "./IProfile";
@injectable()
export class GetAdminProfileUseCase implements IGetAdminProfileUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository,
  ) {}
  async execute(userId: string): Promise<SafeUser|null> {
    const data = await this.userRepository.findById(userId);
    if (!data) return null;
    return userSanitizer(data);
  }
} 
