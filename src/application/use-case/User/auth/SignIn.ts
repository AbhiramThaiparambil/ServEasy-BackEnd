import { IUserRepository } from "../../../../domain/repositories/IuserRepository";
import { container, inject, injectable } from "tsyringe";
import { TokenService } from "../../../../services/auth/TokenService";


@injectable()
export class SignIn {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository,
    @inject("TokenService") private tokenService: TokenService,
  ) {}
  static create(): SignIn {
    const userRepository = container.resolve<IUserRepository>("UserRepository");
    const tokenService = container.resolve<TokenService>("TokenService");
    return new SignIn(userRepository, tokenService);
  }

  async signInWithEmail(email: string, password: string) {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) return { errorMessage: "User does not exist" };
      if(user.isBlocked==true) return {errorMessage: "Your account has been blocked by the admin" }


      const isMatch = await this.userRepository.comparePassword(
        password,
        user.password,
      );
      
      
      
      if (!isMatch) return { errorMessage: "Invalid credentials" };
      if (!user._id) return console.log("userId is missing");

      const accessToken = this.tokenService.generateAccessToken(user._id,"userId");
      const refreshToken = this.tokenService.generateRefreshToken(user._id,"userId");

      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }

  async signInWithPhone(phone: string, password: string) {
    try {
      const user = await this.userRepository.findByPhone(phone);
      if (!user) return { errorMessage: "User does not exist" };
       if(user.isBlocked==true) return {errorMessage: "Your account has been blocked by the admin" }

      const isMatch = await this.userRepository.comparePassword(
        password,
        user.password
      );
      if (!isMatch) return { errorMessage: "Invalid credentials" };
      if (!user._id) return console.log("userId is missing");

      const accessToken = this.tokenService.generateAccessToken(user._id,"userId");
      const refreshToken = this.tokenService.generateRefreshToken(user._id,"userId");

      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }


  
}
