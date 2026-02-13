import { GetUserProfileResponseDTO } from "../../../../../application/dtos/user/profile/GetProfileDTO";

export interface IGetUserProfileUseCase {
  execute(userId: string): Promise<GetUserProfileResponseDTO>;
}
