import { UserRepository } from "../../../../domain/repositories/userRepository";
import { container } from "tsyringe";
import { TokenService } from "../../../../services/auth/TokenService";
export class SignIn {
  private userRepository: UserRepository;
  private tokenService: TokenService;

  constructor(userRepository: UserRepository, tokenService: TokenService) {
    this.userRepository = userRepository;
    this.tokenService = tokenService;
  }

  static create(): SignIn {
    const userRepository = container.resolve<UserRepository>("UserRepository");
    const tokenService = container.resolve<TokenService>("TokenService");
    return new SignIn(userRepository, tokenService);
  }

  async signInWithEmail(email: string, password: string) {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) return { errorMessage: "User does not exist" };
      if(user.isBlocked==true) return {errorMessage: "Your account has been blocked by the admin" }

      if (!user.isVerified) return { errorOtp: "User not verified" };

      const isMatch = await this.userRepository.comparePassword(
        password,
        user.password,
      );
      console.log("password match or not ");
      
      console.log(isMatch);
      
      if (!isMatch) return { errorMessage: "Invalid credentials" };
      if (!user._id) return console.log("userId is missing");

      const accessToken = this.tokenService.generateAccessToken(user._id);
      const refreshToken = this.tokenService.generateRefreshToken(user._id);

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
      if (!user.isVerified) return { errorOtp: "User not verified" };

      const isMatch = await this.userRepository.comparePassword(
        password,
        user.password
      );
      if (!isMatch) return { errorMessage: "Invalid credentials" };
      if (!user._id) return console.log("userId is missing");

      const accessToken = this.tokenService.generateAccessToken(user._id);
      const refreshToken = this.tokenService.generateRefreshToken(user._id);

      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }
}
