import { SendOtpRequestDTO } from "../../../../../dtos/user/auth/resendOtp/ResendOtpDTO";

export interface ISendForgotPasswordOtpUseCase {
  sendEmailOtp(data: SendOtpRequestDTO): Promise<{
    successMessage?: string;
    errorMessage?: string;
  }>;

  sendSmsOtp(data: SendOtpRequestDTO): Promise<{
    successMessage?: string;
    errorMessage?: string;
  }>;
}
