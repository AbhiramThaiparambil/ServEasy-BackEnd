import { UserRepository } from "../../../domain/repositories/userRepository";
import { inject, injectable } from "tsyringe";
import { EmailOtpService } from "../../../services/OTP/mailOtp";
import { Otpservice } from "../../../services/OTP/OtpService";
import { SmsOtpService } from "../../../services/OTP/phoneOtp";

@injectable()
export class SendOtp {
  constructor(
    @inject("UserRepository") private userRepository: UserRepository,
    @inject("EmailOtpService") private emailOtp: EmailOtpService,
    @inject(Otpservice) private otpService: Otpservice,
    @inject("SmsOtpService") private smsOtp: SmsOtpService
  ) {}

  async sendEmailOtp(email: string): Promise<{ successMessage?: string; errorMessage?: string }> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) return { errorMessage: "User does not exist. Please sign in." };

      const otp = this.otpService.generateOtp();
      this.otpService.saveOtp(email, otp);
      await this.emailOtp.sendEmail(email, otp);

      return { successMessage: `OTP sent successfully to ${email}` };
    } catch (error) {
      console.error("Error in sendEmailOtp:", error);
      return { errorMessage: "Failed to send OTP. Please try again." };
    }
  }

  async sendSmsOtp(phone: string): Promise<{ successMessage?: string; errorMessage?: string }> {
    try {
      const user = await this.userRepository.findByPhone(phone); 
      if (!user) return { errorMessage: "User does not exist. Please sign in." };

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
