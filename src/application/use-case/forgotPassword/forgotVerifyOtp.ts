import { inject, injectable } from "tsyringe";
import { Otpservice } from "../../../services/OTP/OtpService";

@injectable()
export class ForgotVerifyOtp {
  constructor(@inject(Otpservice) private otpService: Otpservice) {}

  async execute(otp: string, key: string): Promise<boolean> {
    return await this.otpService.verifyOtp(key, otp);
  }
}
