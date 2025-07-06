import { UserRepository } from '../../../../domain/repositories/IuserRepository';
import { inject, injectable } from 'tsyringe';
import { Otpservice } from '../../../../services/OTP/OtpService';
import { User } from '../../../../domain/entities/IUser';
import { RedisService } from '../../../../services/RedisService';
import { TokenService } from '../../../../services/auth/TokenService';
@injectable()
export class VerifyOtp {
  constructor(
    @inject('UserRepository') private userRepository: UserRepository,
    @inject(Otpservice) private otpSErvice: Otpservice,
    @inject('RedisService') private redisService: RedisService,
    @inject('TokenService') private tokenService: TokenService
  ) {}

  async execute(key: string, enteredOtp: string) {
    const isValidOtp = await this.otpSErvice.verifyOtp(key, enteredOtp);
    console.log(isValidOtp);

    if (!isValidOtp) return { errorMessage: 'Invalid or Expired Otp' };

    console.log(key);
    const user: User | null = await this.redisService.getUser(`user:${key}`);
    console.log('radis saved User', user);
    if (!user) return { errorMessage: 'We couldn’t find your OTP. Please sign up again.' };


     const savedUser= await this.userRepository.create(user);
      if (!savedUser || !savedUser._id) {
      return { errorMessage: 'User creation failed. Please try again.' };
    }


  const accessToken = this.tokenService.generateAccessToken(savedUser._id, 'userId');
  const refreshToken = this.tokenService.generateRefreshToken(savedUser._id, 'userId');
  return { success: 'user verification successful', accessToken, refreshToken };

  
  

  }
}
