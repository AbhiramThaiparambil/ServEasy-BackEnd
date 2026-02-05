import { UserProfileResponseDTO } from "../../../../../application/dtos/user/profile/UserProfileDTO";

export interface IGetUserProfileUseCase {
  execute(userId: string): Promise<UserProfileResponseDTO>;
}
