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
    const user = await this.userRepository.findByPhone(phone);    
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
