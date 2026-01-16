import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../../../domain/repositories/IuserRepository";
import {
  SafeUser,
  userSanitizer,
} from "../../../../../utils/sanitizers/userSanitizer";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IGetAllUsers } from "./IGetAllUsers.usecase";
@injectable()
export class GetAllUsersUseCase implements IGetAllUsers {
  constructor(
    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository
  ) {}
  async execute(
    skip: number,
    limit: number,
    search: string
  ): Promise<{ users: SafeUser[]; count: number }> {
    const users = await this.userRepository.findUsersSkipLimit(
      skip,
      limit,
      search
    );
    const count = await this.userRepository.userCount();

    return { users: users.map(userSanitizer), count };
  }
}
