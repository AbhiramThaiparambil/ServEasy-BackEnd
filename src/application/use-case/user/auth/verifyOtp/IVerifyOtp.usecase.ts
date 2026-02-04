export interface IVerifyOtpUseCase {
  execute(
    key: string,
    enteredOtp: string
  ): Promise<
    | {
        success: string;
        accessToken: string;
        refreshToken: string;
      }
    | {
        errorMessage: string;
      }
  >;
}
