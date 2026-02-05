import { inject, injectable } from "tsyringe";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";
import { AdminProfileResponseDTO } from "../../../dtos/admin/profile/AdminProfileResponseDTO";
import { IUserRepository } from "../../../../domain/repositories/IuserRepository";
import { IGetAdminProfileUseCase } from "./IProfile";

@injectable()
export class GetAdminProfileUseCase implements IGetAdminProfileUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository,
  ) {}
  async execute(userId: string): Promise<AdminProfileResponseDTO | null> {
    const data = await this.userRepository.findById(userId);
    if (!data) return null;
    return {
        _id: data._id,
        userName: data.userName,
        email: data.email || null,
        phone: data.phone || null,
        isBlocked: data.isBlocked || false,
        profileImage: data.profileImage,
        isAdmin: data.isAdmin
    };
  }
} 
