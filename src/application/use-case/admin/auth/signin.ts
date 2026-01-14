import { IUserRepository } from "../../../../domain/repositories/IuserRepository";
import { inject, injectable } from "tsyringe";
import { IAdminSignin } from "./IAdminSignin";
import { IAuthResponse } from "../../../../domain/entities/IAuthResponse";
import {
  REPOSITORY_TOKENS,
  SERVICE_TOKENS,
} from "../../../../constants/tokens";
import { ITokenService } from "../../../../services/token/ITokenService";
``;

@injectable()
export class Signin implements IAdminSignin {
  constructor(
    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository,
    @inject(SERVICE_TOKENS.TokenService) private tokenService: ITokenService
  ) {}

  async signByEmail(
    email: string,
    password: string
  ): Promise<IAuthResponse | null> {
    const user = await this.userRepository.findByEmail(email);
    if (user && user.isAdmin) {
      const isMatch = await this.userRepository.comparePassword(
        password,
        user.password
      );
      if (isMatch) {
        if (!user._id) return null;
        const accessToken = this.tokenService.generateAccessToken(
          user._id.toString(),
          "adminId"
        );
        const refreshToken = await this.tokenService.generateRefreshToken(
          user._id.toString(),
          "adminId"
        );

        return { accessToken, refreshToken, user };
      }
    }
    return null;
  }

  async signByPhone(
    phone: string,
    password: string
  ): Promise<IAuthResponse | null> {
    const user = await this.userRepository.findByPhone(phone);
    if (user && user.isAdmin) {
      const isMatch = await this.userRepository.comparePassword(
        password,
        user.password
      );
      if (isMatch) {
        if (!user._id) return null;
        const accessToken = this.tokenService.generateAccessToken(
          user._id.toString(),
          "adminId"
        );
        const refreshToken = await this.tokenService.generateRefreshToken(
          user._id.toString(),
          "adminId"
        );

        return { accessToken, refreshToken, user };
      }
    }
    return null;
  }
}
