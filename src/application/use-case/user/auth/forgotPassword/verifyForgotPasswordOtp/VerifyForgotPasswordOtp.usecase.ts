import { inject, injectable } from "tsyringe";
import { SERVICE_TOKENS } from "../../../../../../constants/tokens";
import { IOtpService } from "../../../../../../services/otp/IOtpService";
import { IVerifyForgotPasswordOtpUseCase } from "./IVerifyForgotPasswordOtp.usecase";
import { VerifyOtpRequestDTO } from "../../../../../dtos/user/auth/verifyOtp/VerifyOtpDTO";

@injectable()
export class VerifyForgotPasswordOtpUseCase
  implements IVerifyForgotPasswordOtpUseCase
{
  constructor(
    @inject(SERVICE_TOKENS.OtpService) private otpService: IOtpService
  ) {}

  async execute(data: VerifyOtpRequestDTO): Promise<boolean> {
    const { sender: key, otp } = data;
    return await this.otpService.verifyOtp(key, otp);
  }
}
