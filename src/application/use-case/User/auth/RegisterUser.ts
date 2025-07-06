import { UserRepository } from '../../../../domain/repositories/IuserRepository';
import { User } from '../../../../domain/entities/IUser';
import { inject, injectable } from 'tsyringe';
import { EmailOtpService } from '../../../../services/OTP/mailOtp';
import { Otpservice } from '../../../../services/OTP/OtpService';
import { SmsOtpService } from '../../../../services/OTP/phoneOtp';
import bcrypt from 'bcrypt';
import { RedisService } from '../../../../services/RedisService';

@injectable()
export class RegisterUser {
  constructor(
    @inject('UserRepository') private userRepository: UserRepository,
    @inject('EmailOtpService') private emailOtp: EmailOtpService,
    @inject(Otpservice) private otpService: Otpservice,
    @inject('SmsOtpService') private smsOtp: SmsOtpService,
    @inject('RedisService') private redisService: RedisService
  ) {}

  async sendEmailOtp(email: string): Promise<void> {
    const otp = this.otpService.generateOtp();
    this.otpService.saveOtp(email, otp);

    await this.emailOtp.sendEmail(email, otp);
  }

  async sendSmsOtp(phone: string): Promise<void> {
    const otp = this.otpService.generateOtp();
    this.otpService.saveOtp(phone, otp);
    await this.smsOtp.SendOtp(phone, otp);
  }

  async execute(userData: { userName: string; email?: string; phone?: string; password: string }) {
    const { userName, email, phone, password } = userData;
    if (email) {
      delete userData?.phone;

      const isExist = await this.userRepository.findByEmail(email);
      if (isExist) {
        console.log('email is allready exist');

        return { errorMessage: 'email is allready exist' };
      }
    } else if (phone) {
      delete userData?.email;

      const isExist = await this.userRepository.findByPhone(phone);
      if (isExist) {
        return { errorMessage: 'phone number  allready exist' };
      }
    }
    const hashedPassword = await bcrypt.hash(userData?.password, 10);

    userData.password = hashedPassword;
    const user: User = {
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
