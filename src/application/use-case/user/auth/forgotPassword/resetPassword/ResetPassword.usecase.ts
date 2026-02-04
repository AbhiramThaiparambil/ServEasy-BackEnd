import { inject, injectable } from "tsyringe";
import { IUserRepository } from "../../../../../../domain/repositories/IuserRepository";
import { REPOSITORY_TOKENS } from "../../../../../../constants/tokens";
import { IResetPasswordUseCase } from "./IResetPassword.usecase";

@injectable()
export class ResetPasswordUseCase implements IResetPasswordUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository,
  ) {}

  async resetPasswordEmail(
    newPassword: string,
    email: string,
  ): Promise<string | void> {
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
    newPassword: string,
    phone: string,
  ): Promise<string | void> {
    const user = await this.userRepository.findByEmail(phone);

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
