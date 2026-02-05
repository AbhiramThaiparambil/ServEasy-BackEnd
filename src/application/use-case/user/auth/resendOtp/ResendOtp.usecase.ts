import { inject, injectable } from "tsyringe";
import { IEmailService } from "../../../../../services/mailService/IEmailService";
import { ISmsOtpService } from "../../../../../services/otp/ISmsOtpService";
import { IOtpService } from "../../../../../services/otp/IOtpService";
import { SERVICE_TOKENS } from "../../../../../constants/tokens";
import { IResendOtp } from "./IResendOtp.usecase";
import { SendOtpRequestDTO } from "../../../../dtos/user/auth/resendOtp/ResendOtpDTO";

@injectable()
export class ResendOtp implements IResendOtp {
  constructor(
    @inject(SERVICE_TOKENS.EmailService) private emailOtp: IEmailService,
    @inject(SERVICE_TOKENS.SmsOtpService) private smsOtp: ISmsOtpService,
    @inject(SERVICE_TOKENS.OtpService) private otpService: IOtpService
  ) {}

  async sendEmailOtp(data: SendOtpRequestDTO): Promise<string> {
    const { email } = data;
    if (!email) throw new Error("Email is required");

    const otp = this.otpService.generateOtp();
    this.otpService.saveOtp(email, otp);

    await this.emailOtp.sendOtpEmail(email, otp);
    return `otp send to ${email} successFully`;
  }

  async sendSmsOtp(data: SendOtpRequestDTO): Promise<string> {
    const { phone } = data;
    if (!phone) throw new Error("Phone is required");

    const otp = this.otpService.generateOtp();
    this.otpService.saveOtp(phone, otp);
    await this.smsOtp.SendOtp(phone, otp);
    return `otp send to ${phone} successFully`;
  }
}
