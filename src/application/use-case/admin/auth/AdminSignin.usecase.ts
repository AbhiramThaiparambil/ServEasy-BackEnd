import { inject, injectable } from "tsyringe";
import { IAdminSignin } from "./IAdminSignin.usecase";
import {
  REPOSITORY_TOKENS,
  SERVICE_TOKENS,
} from "../../../../constants/tokens";
import { ITokenService } from "../../../../services/token/ITokenService";
import { IUserRepository } from "../../../../domain/repositories/IuserRepository";
import { AdminLoginDTO, AdminLoginResponseDTO } from "../../../dtos/admin/auth/AdminAuthDTO";

@injectable()
export class AdminSignin implements IAdminSignin {
  constructor(
    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository,
    @inject(SERVICE_TOKENS.TokenService) private tokenService: ITokenService
  ) {}

  async execute(data: AdminLoginDTO): Promise<AdminLoginResponseDTO> {
    const { email, phone, password } = data;

    if (email) {
      return this.signByEmail(email, password);
    } else if (phone) {
      return this.signByPhone(phone, password);
    }
    return null;
  }

  private async signByEmail(
    email: string,
    password: string
  ): Promise<AdminLoginResponseDTO> {
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

  private async signByPhone(
    phone: string,
    password: string
  ): Promise<AdminLoginResponseDTO> {
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
