import { inject, injectable } from "tsyringe";
import { Otpservice } from "../../../../services/otp/OtpService";
import { SmsOtpService } from "../../../../services/otp/SmsOtpService";
import { EmailService } from "../../../../services/mailService/MailService";
import { SERVICE_TOKENS } from "../../../../constants/tokens";
import { IEmailService } from "../../../../services/mailService/IEmailService";
import { ISmsOtpService } from "../../../../services/otp/ISmsOtpService";
import { IOtpService } from "../../../../services/otp/IOtpService";

@injectable()
export class ResendOtp {
  constructor(
    @inject(SERVICE_TOKENS.EmailService) private emailOtp: IEmailService,
    @inject(SERVICE_TOKENS.SmsOtpService) private smsOtp: ISmsOtpService,
    @inject(SERVICE_TOKENS.Otpservice) private otpService: IOtpService
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
