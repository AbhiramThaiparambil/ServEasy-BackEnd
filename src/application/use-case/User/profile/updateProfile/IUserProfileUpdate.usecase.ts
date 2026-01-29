import { IUser } from "../../../../../domain/entities/IUser";

export interface IProfileOtpResponse {
  successMessage?: string;
  errorMessage?: string;
  auth?: string; // email or phone
}
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
    userId: string,
    newUserName?: string,
    newProfileImage?: string,
    newPassword?: string,
    oldPassword?: string,
  ): Promise<IUpdateProfileResult>;

  sendEmailOtp(email: string): Promise<IProfileOtpResponse>;

  sendSmsOtp(phone: string): Promise<IProfileOtpResponse>;
}
