import { UserRepository } from "../../domain/repositories/userRepository";
import { User } from "../../domain/entities/user";
import { inject, injectable } from "tsyringe";
import { EmailOtpService } from "../../services/OTP/mailOtp";
import { Otpservice } from "../../services/OTP/OtpService";
import { SmsOtpService } from "../../services/OTP/phoneOtp";
type IUserData = {
  userName: string;
  email?: string;
  phone?: string;
  password: string;
};
@injectable()
export class RegisterUser {
  constructor(
    
    @inject("UserRepository") private userRepository: UserRepository,
    @inject("EmailOtpService") private emailOtp: EmailOtpService,
    @inject(Otpservice) private otpService: Otpservice,
    @inject("SmsOtpService") private smsOtp:SmsOtpService
  ) {

    
  }
    
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

  async execute(userData: {
    userName: string;
    email?: string;
    phone?: string;
    password: string;
  }) {

  

 console.log(userData);
 

    const { userName, email, phone, password } = userData;
    if (email) {
        delete userData.phone 
      const isExist = await this.userRepository.findByEmail(email);
      if (isExist) {
        return { errorMessage: "email is allready exist" };
      }
    } else if (phone) {
        delete userData.email 

      const isExist = await this.userRepository.findByPhone(phone);
      if (isExist) {
        return { errorMessage: "phone number  allready exist" };
      }
    }
    const user: User = userData;
 
    


    const newUser = await this.userRepository.create(user);
    if(newUser.email){
        await this.sendEmailOtp(newUser.email)
    }else if(newUser.phone){
         await this.sendSmsOtp(newUser.phone)
    }

    return { user: newUser };
  }
}
