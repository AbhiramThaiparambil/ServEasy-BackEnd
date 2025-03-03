import { UserRepository } from "../../../domain/repositories/userRepository";
import { inject, injectable } from "tsyringe";
import { TokenService } from "../../../services/auth/TokenService";

@injectable()
export class Signin {
  constructor(
    @inject("UserRepository") private userRepository: UserRepository,
    @inject("TokenService") private tokenService: TokenService
  ) {}

  async signByEmail(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    if (user && user.isAdmin) {
      const isMatch = await this.userRepository.comparePassword(password, user.password);
      if (isMatch) {
        if(!user._id)return null
        const accessToken = this.tokenService.generateAccessToken(user._id.toString());
        const refreshToken = await this.tokenService.generateRefreshToken(user._id.toString());

        return { accessToken, refreshToken, user };
      }
    }
    return null;
  }

  async signByPhone(phone: string, password: string) {
    const user = await this.userRepository.findByPhone(phone);
    if (user && user.isAdmin) {
      const isMatch = await this.userRepository.comparePassword(password, user.password);
      if (isMatch) {
        if(!user._id)return null
        const accessToken = this.tokenService.generateAccessToken(user._id.toString());
        const refreshToken = await this.tokenService.generateRefreshToken(user._id.toString());

        return { accessToken, refreshToken, user };
      }
    }
    return null;
  }
}
