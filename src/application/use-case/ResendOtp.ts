import { inject, injectable } from "tsyringe";
import { Otpservice } from "../../services/OTP/OtpService";
import { SmsOtpService } from "../../services/OTP/phoneOtp";
import { EmailOtpService } from "../../services/OTP/mailOtp";

@injectable()
export class ResendOtp {
  constructor(
    @inject("EmailOtpService") private emailOtp: EmailOtpService,
    @inject("SmsOtpService") private smsOtp: SmsOtpService,
    @inject(Otpservice) private otpService: Otpservice
  ) {}

  async sendEmailOtp(email: string): Promise<string> {
    const otp = this.otpService.generateOtp();
    this.otpService.saveOtp(email, otp);

    await this.emailOtp.sendEmail(email, otp);
    return `otp send to ${email} successFully`;
  }

  async sendSmsOtp(phone: string): Promise<string> {
    const otp = this.otpService.generateOtp();
    this.otpService.saveOtp(phone, otp);
    await this.smsOtp.SendOtp(phone, otp);
    return `otp send to ${phone} successFully`
  }
}
