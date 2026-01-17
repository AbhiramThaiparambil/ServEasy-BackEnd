import { inject, injectable } from "tsyringe";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";
import { userSanitizer } from "../../../../utils/sanitizers/userSanitizer";
import { IUserRepository } from "../../../../domain/repositories/IuserRepository";
@injectable()
export class GetAdminProfileUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository,
  ) {}
  async execute(userId: string) {
    const data = await this.userRepository.findById(userId);
    if (!data) return data;
    return userSanitizer(data);
  }
}
