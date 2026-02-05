import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../../../../domain/repositories/IuserRepository";
import { REPOSITORY_TOKENS } from "../../../../../../constants/tokens";
import { IResetPasswordUseCase } from "./IResetPassword.usecase";
import { ResetPasswordRequestDTO } from "../../../../../dtos/user/auth/forgotPassword/ResetPasswordDTO";

@injectable()
export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository,
  ) {}

  async resetPasswordEmail(
    data: ResetPasswordRequestDTO
  ): Promise<string | void> {
    const { newPassword, email } = data;
    if (!email) return "Email is required";
    console.log("hey im usecaese ");

    const user = await this.userRepository.findByEmail(email);

    if (!user || !user._id) {
      throw new Error("User not found");
    }

    if (user.password) {
      const hashedPassword =
        await this.userRepository.HashPassword(newPassword);

      const res = await this.userRepository.updatePassword(
        user._id,
        hashedPassword,
      );
      console.log(res);
      if (res == true) {
        return "Password reset successfully.";
      }
    }
  }

  async resetPasswordPhone(
    data: ResetPasswordRequestDTO
  ): Promise<string | void> {
    const { newPassword, phone } = data;
    if (!phone) return "Phone number is required";
    const user = await this.userRepository.findByPhone(phone); // Corrected from findByEmail to findByPhone as per typical logic, but original code used findByEmail(phone). Fixing it to be consistent but probably should use findByPhone if it exists. Original code was likely buggy: `await this.userRepository.findByEmail(phone)`. I will stick to original logic but extract phone. Wait, original logic `userRepository.findByEmail(phone)` seems wrong. I'll change it to `findByPhone` if available, but the original code had `findByEmail(phone)`. I will check if `findByPhone` exists in `IUserRepository`.
    // Actually, looking at `SendForgotPasswordOtpUseCase`, it uses `this.userRepository.findByPhone(phone)`. So `findByPhone` exists. I will use `findByPhone`.
    
    if (!user || !user._id) {
      throw new Error("User not found");
    }

    if (user.password) {
      const hashedPassword =
        await this.userRepository.HashPassword(newPassword);

      const res = await this.userRepository.updatePassword(
        user._id,
        hashedPassword,
      );
      console.log(res);
      if (res == true) {
        return "Password reset successfully.";
      }
    }
  }
}
