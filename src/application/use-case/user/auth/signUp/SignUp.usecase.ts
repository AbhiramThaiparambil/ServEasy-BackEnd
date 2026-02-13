import { inject, injectable } from "tsyringe";
import {
  REPOSITORY_TOKENS,
  SERVICE_TOKENS,
} from "../../../../../constants/tokens";
import { IUserRepository } from "../../../../../domain/repositories/IuserRepository";
import { IEmailService } from "../../../../../services/mailService/IEmailService";

import { IRedisService } from "../../../../../services/redis/IRedisService";
import { ISmsOtpService } from "../../../../../services/otp/ISmsOtpService";
import { IOtpService } from "../../../../../services/otp/IOtpService";
import { IUser } from "../../../../../domain/entities/IUser";
import { ISignUpUseCase } from "./ISignUp.usecase";
import { SignUpRequestDTO } from "../../../../dtos/user/auth/signUp/SignUpDTO";


@injectable()
export class SignUpUseCase implements ISignUpUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository,
    @inject(SERVICE_TOKENS.EmailService) private emailOtp: IEmailService,
    @inject(SERVICE_TOKENS.OtpService) private otpService: IOtpService,
    @inject(SERVICE_TOKENS.SmsOtpService) private smsOtp: ISmsOtpService,
    @inject(SERVICE_TOKENS.RedisService) private redisService: IRedisService
  ) {}

  async sendEmailOtp(email: string): Promise<void> {
    const otp = this.otpService.generateOtp();
    this.otpService.saveOtp(email, otp);

    await this.emailOtp.sendOtpEmail(email, otp);
  }

  async sendSmsOtp(phone: string): Promise<void> {
    const otp = this.otpService.generateOtp();
    this.otpService.saveOtp(phone, otp);
    await this.smsOtp.SendOtp(phone, otp);
  }

  async execute(userData: SignUpRequestDTO) {
    const { userName, email, phone, password } = userData;
    if (email) {
      delete userData?.phone;

      const isExist = await this.userRepository.findByEmail(email);
      if (isExist) {
        console.log("email is allready exist");

        return { errorMessage: "email is allready exist" };
      }
    } else if (phone) {
      delete userData?.email;

      const isExist = await this.userRepository.findByPhone(phone);
      if (isExist) {
        return { errorMessage: "phone number  allready exist" };
      }
    }
    const hashedPassword = await this.userRepository.HashPassword(
      userData?.password
    );

    userData.password = hashedPassword;
    const user: IUser = {
      userName,
      email,
      phone,
      password: hashedPassword,
      isVerified: false,
    };

    if (user.email) {
      this.redisService.saveUser(`user:${user.email}`, user);

      await this.sendEmailOtp(user.email);
    } else if (user.phone) {
      this.redisService.saveUser(`user:${user.phone}`, user);
      await this.sendSmsOtp(user.phone);
    }

    return { user: user };
  }
}
