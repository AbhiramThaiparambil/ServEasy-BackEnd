import { inject, injectable } from "tsyringe";
import { SERVICE_TOKENS } from "../../../../../../constants/tokens";
import { IOtpService } from "../../../../../../services/otp/IOtpService";
import { IVerifyForgotPasswordOtpUseCase } from "./IVerifyForgotPasswordOtp.usecase";

@injectable()
export class VerifyForgotPasswordOtpUseCase
  implements IVerifyForgotPasswordOtpUseCase
{
  constructor(
    @inject(SERVICE_TOKENS.OtpService) private otpService: IOtpService
  ) {}

  async execute(otp: string, key: string): Promise<boolean> {
    return await this.otpService.verifyOtp(key, otp);
  }
}
