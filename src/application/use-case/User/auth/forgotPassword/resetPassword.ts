import { IUserRepository } from "../../../../../domain/repositories/IuserRepository";
import { User } from "../../../../../domain/entities/IUser";
import { inject, injectable } from "tsyringe";
import bcrypt from "bcrypt";
import { REPOSITORY_TOKENS } from "../../../../../utils/constants/tokens";

@injectable()
export class ResetPassword {
  constructor(
    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository
  ) {}

  async resetPasswordEmail(
    newPassword: string,
    email: string
  ): Promise<string | void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user || !user._id) {
      throw new Error("User not found");
    }

    if (user.password) {
      const hashedPassword = await this.userRepository.HashPassword(
        newPassword
      );

      const res = await this.userRepository.updatePassword(
        user._id,
        hashedPassword
      );
      console.log(res);
      if (res == true) {
        return "Password reset successfully.";
      }
    }
  }

  async resetPasswordPhone(
    newPassword: string,
    phone: string
  ): Promise<string | void> {
    const user = await this.userRepository.findByEmail(phone);

    if (!user || !user._id) {
      throw new Error("User not found");
    }

    if (user.password) {
      const hashedPassword = await this.userRepository.HashPassword(
        newPassword
      );

      const res = await this.userRepository.updatePassword(
        user._id,
        hashedPassword
      );
      console.log(res);
      if (res == true) {
        return "Password reset successfully.";
      }
    }
  }
}
