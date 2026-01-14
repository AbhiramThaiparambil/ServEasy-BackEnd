import { IUserRepository } from "../../../domain/repositories/IuserRepository";
import { inject, injectable } from "tsyringe";
import { Otpservice } from "../../../services/otp/OtpService";
import { REPOSITORY_TOKENS } from "../../../utils/constants/tokens";

@injectable()
export class ProfileUpdateOtp {
  constructor(
    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository,
    @inject("OtpService") private otpService: Otpservice
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
