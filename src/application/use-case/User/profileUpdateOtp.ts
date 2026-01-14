import { IUserRepository } from "../../../domain/repositories/IuserRepository";
import { inject, injectable } from "tsyringe";
import { Otpservice } from "../../../services/otp/OtpService";
import { REPOSITORY_TOKENS, SERVICE_TOKENS } from "../../../constants/tokens";
import { IOtpService } from "../../../services/otp/IOtpService";

@injectable()
export class ProfileUpdateOtp {
  constructor(
    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository,
    @inject(SERVICE_TOKENS.Otpservice) private otpService: IOtpService
  ) {}

  async execute(userId: string, key: string, enteredOtp: string) {
    const isValidOtp = await this.otpService.verifyOtp(key, enteredOtp);
    console.log(isValidOtp);

    if (!isValidOtp) {
      return { errorMessage: "Invalid or expired OTP" };
    }

    const data: { email?: string; phone?: string } = {};

    if (key.includes("@")) {
      data.email = key;
    } else {
      data.phone = key;
    }

    await this.userRepository.updateUserBasedId(userId, data);

    return {
      success: `User verification successful. ${key} updated successfully.`,
    };
  }
}
