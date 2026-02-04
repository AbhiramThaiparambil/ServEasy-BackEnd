export interface ISendForgotPasswordOtpUseCase {
  sendEmailOtp(email: string): Promise<{
    successMessage?: string;
    errorMessage?: string;
  }>;

  sendSmsOtp(phone: string): Promise<{
    successMessage?: string;
    errorMessage?: string;
  }>;
}
