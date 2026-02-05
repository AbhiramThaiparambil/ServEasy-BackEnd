import { IUserRepository } from "../../../../../domain/repositories/IuserRepository";
import { container, inject, injectable } from "tsyringe";
import {
  REPOSITORY_TOKENS,
  SERVICE_TOKENS,
} from "../../../../../constants/tokens";
import { ITokenService } from "../../../../../services/token/ITokenService";
import { ISignInUseCase } from "./ISignIn.usecase";

import { SignInRequestDTO } from "../../../../../application/dtos/user/auth/UserAuthDTO";

@injectable()
export class SignIn implements ISignInUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository,
    @inject(SERVICE_TOKENS.TokenService) private tokenService: ITokenService
  ) {}
  static create(): SignIn {
    const userRepository = container.resolve<IUserRepository>(
      REPOSITORY_TOKENS.UserRepository
    );
    const tokenService = container.resolve<ITokenService>(
      SERVICE_TOKENS.TokenService
    );
    return new SignIn(userRepository, tokenService);
  }

  async signInWithEmail(
    data: SignInRequestDTO
  ): Promise<
    { accessToken: string; refreshToken: string } | { errorMessage: string }
  > {
    try {
      const { email, password } = data;
      if (!email) return { errorMessage: "Email is required" };

      const user = await this.userRepository.findByEmail(email);
      if (!user) return { errorMessage: "User does not exist" };
      if (user.isBlocked == true)
        return { errorMessage: "Your account has been blocked by the admin" };

      const isMatch = await this.userRepository.comparePassword(
        password,
        user.password
      );

      if (!isMatch) return { errorMessage: "Invalid credentials" };

      if (!user._id) {
        console.log("userId is missing");
        return { errorMessage: "userId is missing" };
      }

      const accessToken = this.tokenService.generateAccessToken(
        user._id,
        "userId"
      );
      const refreshToken = this.tokenService.generateRefreshToken(
        user._id,
        "userId"
      );

      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }

  async signInWithPhone(
    data: SignInRequestDTO
  ): Promise<
    { accessToken: string; refreshToken: string } | { errorMessage: string }
  > {
    try {
      const { phone, password } = data;
      if (!phone) return { errorMessage: "Phone is required" };

      const user = await this.userRepository.findByPhone(phone);
      if (!user) return { errorMessage: "User does not exist" };
      if (user.isBlocked == true)
        return { errorMessage: "Your account has been blocked by the admin" };

      const isMatch = await this.userRepository.comparePassword(
        password,
        user.password
      );
      if (!isMatch) return { errorMessage: "Invalid credentials" };
      if (!user._id) {
        console.log("userId is missing");
        return { errorMessage: "userId is missing" };
      }

      const accessToken = this.tokenService.generateAccessToken(
        user._id,
        "userId"
      );
      const refreshToken = this.tokenService.generateRefreshToken(
        user._id,
        "userId"
      );

      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }
}
