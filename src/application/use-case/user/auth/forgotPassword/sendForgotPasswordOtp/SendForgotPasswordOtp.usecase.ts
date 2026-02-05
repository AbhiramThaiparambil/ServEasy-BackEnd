import { IUserRepository } from "../../../../../../domain/repositories/IuserRepository";
import { inject, injectable } from "tsyringe";
import { EmailService } from "../../../../../../services/mailService/MailService";

import {
  REPOSITORY_TOKENS,
  SERVICE_TOKENS,
} from "../../../../../../constants/tokens";
import { IEmailService } from "../../../../../../services/mailService/IEmailService";
import { IOtpService } from "../../../../../../services/otp/IOtpService";
import { ISmsOtpService } from "../../../../../../services/otp/ISmsOtpService";
import { ISendForgotPasswordOtpUseCase } from "./ISendForgotPasswordOtp.usecase";
import { SendOtpRequestDTO } from "../../../../../dtos/user/auth/resendOtp/ResendOtpDTO";

@injectable()
export class SendForgotPasswordOtpUseCase
  implements ISendForgotPasswordOtpUseCase
{
  constructor(
    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository,
    @inject(SERVICE_TOKENS.EmailService) private emailOtp: IEmailService,
    @inject(SERVICE_TOKENS.OtpService) private otpService: IOtpService,
    @inject(SERVICE_TOKENS.SmsOtpService) private smsOtp: ISmsOtpService
  ) {}

  async sendEmailOtp(
    data: SendOtpRequestDTO
  ): Promise<{ successMessage?: string; errorMessage?: string }> {
    const { email } = data;
    if (!email) return { errorMessage: "Email is required" };
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user)
        return { errorMessage: "User does not exist. Please sign in." };

      const otp = this.otpService.generateOtp();
      this.otpService.saveOtp(email, otp);
      await this.emailOtp.sendOtpEmail(email, otp);

      return { successMessage: `OTP sent successfully to ${email}` };
    } catch (error) {
      console.error("Error in sendEmailOtp:", error);
      return { errorMessage: "Failed to send OTP. Please try again." };
    }
  }

  async sendSmsOtp(
    data: SendOtpRequestDTO
  ): Promise<{ successMessage?: string; errorMessage?: string }> {
    const { phone } = data;
    if (!phone) return { errorMessage: "Phone is required" };
    try {
      const user = await this.userRepository.findByPhone(phone);
      if (!user)
        return { errorMessage: "User does not exist. Please sign in." };

      const otp = this.otpService.generateOtp();
      this.otpService.saveOtp(phone, otp);
      await this.smsOtp.SendOtp(phone, otp);

      return { successMessage: `OTP sent successfully to ${phone}` };
    } catch (error) {
      console.error("Error in sendSmsOtp:", error);
      return { errorMessage: "Failed to send OTP. Please try again." };
    }
  }
}
