export interface IProfileOtpResponse {
  successMessage?: string;
  errorMessage?: string;
  auth?: string; // email or phone
}
export interface IUserProfileUpdateUseCase {
  updateProfile(
    userId: string,
    newUserName?: string,
    newProfileImage?: string,
  ): Promise<boolean>;

  sendEmailOtp(email: string): Promise<IProfileOtpResponse>;

  sendSmsOtp(phone: string): Promise<IProfileOtpResponse>;
}
