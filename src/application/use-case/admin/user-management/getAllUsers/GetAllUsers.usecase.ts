import { inject, injectable } from "tsyringe";

import { IGetAllUsers } from "./IGetAllUsers.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IUserRepository } from "../../../../../domain/repositories/IuserRepository";
import {
  userSanitizer,
} from "../../../../../utils/sanitizers/userSanitizer";
import { GetUserListRequestDTO, UserListResponseDTO } from "../../../../dtos/admin/user/UserManagementDTO";

@injectable()
export class GetAllUsersUseCase implements IGetAllUsers {
  constructor(
    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository
  ) {}
  async execute(
    request: GetUserListRequestDTO
  ): Promise<UserListResponseDTO> {
    const { skip, limit, search } = request;
    const users = await this.userRepository.findUsersSkipLimit(
      skip,
      limit,
      search
    );
    const count = await this.userRepository.userCount();

    const mappedUsers = users.map(userSanitizer).map(safeUser => ({
        _id: safeUser._id || "",
        userName: safeUser.userName,
        email: safeUser.email,
        phone: safeUser.phone,
        isBlocked: safeUser.isBlocked,
        profileImage: safeUser.profileImage,
        isAdmin: safeUser.isAdmin,
        serviceProvider: safeUser.serviceProvider?.toString()
    }));

    return { users: mappedUsers, count };
  }
}
