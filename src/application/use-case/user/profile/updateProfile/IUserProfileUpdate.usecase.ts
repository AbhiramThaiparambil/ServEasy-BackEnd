import {
  UpdateProfileRequestDTO,
  ProfileOtpResponseDTO,
} from "../../../../../application/dtos/user/profile/UpdateProfileDTO";

export type IUpdateProfileResult =
  | {
      updated: true;
      result: unknown;
    }
  | {
      updated: false;
      message: string;
    };
export interface IUserProfileUpdateUseCase {
  updateProfile(
    request: UpdateProfileRequestDTO
  ): Promise<IUpdateProfileResult>;

  sendEmailOtp(email: string): Promise<ProfileOtpResponseDTO>;

  sendSmsOtp(phone: string): Promise<ProfileOtpResponseDTO>;
}
