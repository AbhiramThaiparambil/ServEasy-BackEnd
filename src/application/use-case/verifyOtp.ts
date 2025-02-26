import { UserRepository } from "../../domain/repositories/userRepository";
import { inject, injectable } from "tsyringe";
import { Otpservice } from "../../services/OTP/OtpService";
import { User } from "../../domain/entities/user";
@injectable()
export class VerifyOtp {
  constructor(
    @inject("UserRepository") private userRepository: UserRepository,
    @inject(Otpservice) private otpSErvice: Otpservice
  ) {}

  async execute(key: string, enteredOtp: string) {
    const isValidOtp = this.otpSErvice.verifyOtp(key, enteredOtp);


    if (!isValidOtp) return { errorMessage: "Invalid or Expired Otp" };

    let user: User | null;
    user = await this.userRepository.findByPhone(key);
    if (!user) {
      user = await this.userRepository.findByEmail(key);
    }

    return { success: "user verification successful" };
  }
}
