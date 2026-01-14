import { inject, injectable } from "tsyringe";
import { Otpservice } from "../../../../services/otp/OtpService";
import { SmsOtpService } from "../../../../services/otp/phoneOtp";
import { EmailService } from "../../../../services/mailService/MailService";

@injectable()
export class ResendOtp {
  constructor(
    @inject("EmailOtpService") private emailOtp: EmailService,
    @inject("SmsOtpService") private smsOtp: SmsOtpService,
    @inject(Otpservice) private otpService: Otpservice
  ) {}

  async sendEmailOtp(email: string): Promise<string> {
    const otp = this.otpService.generateOtp();
    this.otpService.saveOtp(email, otp);

    await this.emailOtp.sendOtpEmail(email, otp);
    return `otp send to ${email} successFully`;
  }

  async sendSmsOtp(phone: string): Promise<string> {
    const otp = this.otpService.generateOtp();
    this.otpService.saveOtp(phone, otp);
    await this.smsOtp.SendOtp(phone, otp);
    return `otp send to ${phone} successFully`;
  }
}
