export interface IVerifyForgotPasswordOtpUseCase {
  execute(otp: string, key: string): Promise<boolean>;
}
