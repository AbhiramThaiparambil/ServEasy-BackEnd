import { inject, injectable } from "tsyringe";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IUserRepository } from "../../../../../domain/repositories/IuserRepository";
import {
  userSanitizer,
} from "../../../../../utils/sanitizers/userSanitizer";
import { IGetUserProfileUseCase } from "./IGetUserProfile.usecase";
import { GetUserProfileResponseDTO } from "../../../../../application/dtos/user/profile/GetProfileDTO";

@injectable()
export class GetUserProfileUseCase implements IGetUserProfileUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository,
  ) {}
  async execute(userId: string): Promise<GetUserProfileResponseDTO> {
    const data = await this.userRepository.findById(userId);
    if (!data) return { user: null };

    return { user: userSanitizer(data) };
  }
}
