import { inject, injectable } from "tsyringe";
import {
  REPOSITORY_TOKENS,
  SERVICE_TOKENS,
} from "../../../../../constants/tokens";
import { IRedisService } from "../../../../../services/redis/IRedisService";
import { ITokenService } from "../../../../../services/token/ITokenService";
import { IUser } from "../../../../../domain/entities/IUser";
import { IUserRepository } from "../../../../../domain/repositories/IuserRepository";
import { IOtpService } from "../../../../../services/otp/IOtpService";
import { IVerifyOtpUseCase } from "./IVerifyOtp.usecase";

@injectable()
export class VerifyOtp implements IVerifyOtpUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository,
    @inject(SERVICE_TOKENS.OtpService) private otpSErvice: IOtpService,
    @inject(SERVICE_TOKENS.RedisService) private redisService: IRedisService,
    @inject(SERVICE_TOKENS.TokenService) private tokenService: ITokenService
  ) {}

  async execute(
    key: string,
    enteredOtp: string
  ): Promise<
    | {
        success: string;
        accessToken: string;
        refreshToken: string;
      }
    | {
        errorMessage: string;
      }
  > {
    const isValidOtp = await this.otpSErvice.verifyOtp(key, enteredOtp);
    console.log(isValidOtp);

    if (!isValidOtp) return { errorMessage: "Invalid or Expired Otp" };

    console.log(key);
    const user: IUser | null = await this.redisService.getUser(`user:${key}`);
    console.log("radis saved User", user);
    if (!user)
      return {
        errorMessage: "We couldn’t find your OTP. Please sign up again.",
      };

    const savedUser = await this.userRepository.create(user);
    if (!savedUser || !savedUser._id) {
      return { errorMessage: "User creation failed. Please try again." };
    }

    const accessToken = this.tokenService.generateAccessToken(
      savedUser._id,
      "userId"
    );
    const refreshToken = this.tokenService.generateRefreshToken(
      savedUser._id,
      "userId"
    );
    return {
      success: "user verification successful",
      accessToken,
      refreshToken,
    };
  }
}
