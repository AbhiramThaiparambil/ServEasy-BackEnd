import { UserRepository } from "../../../../domain/repositories/IuserRepository";
import { inject, injectable } from "tsyringe";
import { TokenService } from "../../../../services/auth/TokenService";
import { IAdminSignin } from "./IAdminSignin";
import { IAuthResponse } from "../../../../domain/entities/IAuthResponse";

@injectable()
export class  Signin implements IAdminSignin {
  constructor(
    @inject("UserRepository") private userRepository: UserRepository,
    @inject("TokenService") private tokenService: TokenService
  ) {}

  async signByEmail(email: string, password: string):Promise<IAuthResponse|null>{
    const user = await this.userRepository.findByEmail(email);
    if (user && user.isAdmin) {
      const isMatch = await this.userRepository.comparePassword(password, user.password);
      if (isMatch) {
        if(!user._id)return null
        const accessToken =  this.tokenService.generateAccessToken(user._id.toString(),"adminId");
        const refreshToken = await this.tokenService.generateRefreshToken(user._id.toString(),"adminId");

        return { accessToken, refreshToken, user };
      }
    }
    return null;
  }

  async signByPhone(phone: string, password: string):Promise<IAuthResponse|null> {
    const user = await this.userRepository.findByPhone(phone);
    if (user && user.isAdmin) {
      const isMatch = await this.userRepository.comparePassword(password, user.password);
      if (isMatch) {
        if(!user._id)return null
        const accessToken = this.tokenService.generateAccessToken(user._id.toString(),"adminId");
        const refreshToken = await this.tokenService.generateRefreshToken(user._id.toString(),"adminId");

        return { accessToken, refreshToken, user };
      }
    }
    return null;
  }
}
