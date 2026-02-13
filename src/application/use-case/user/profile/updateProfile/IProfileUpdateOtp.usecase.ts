import { UpdateProfileResponseDTO } from "../../../../dtos/user/profile/UpdateProfileDTO";

export interface IProfileUpdateOtpUseCase {
  execute(
    userId: string,
    key: string,
    enteredOtp: string,
  ): Promise<UpdateProfileResponseDTO>;
}
