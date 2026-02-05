import { SendOtpRequestDTO } from "../../../../dtos/user/auth/resendOtp/ResendOtpDTO";

export interface IResendOtp {
  sendEmailOtp(data: SendOtpRequestDTO): Promise<string>;
  sendSmsOtp(data: SendOtpRequestDTO): Promise<string>;
}
