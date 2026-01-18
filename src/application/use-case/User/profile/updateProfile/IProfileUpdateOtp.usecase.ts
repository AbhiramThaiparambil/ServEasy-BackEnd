export interface IProfileUpdateOtpResult {
  success?: string;
  errorMessage?: string;
}
export interface IProfileUpdateOtpUseCase {
  execute(
    userId: string,
    key: string,
    enteredOtp: string,
  ): Promise<IProfileUpdateOtpResult>;
}
