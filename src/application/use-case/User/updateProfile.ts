import { injectable, inject } from "tsyringe";
import { CloudinaryService } from "../../../services/cloudinary/cloudinary"; 
import { MongoUserRepository } from "../../../infrastructure/repositories/UserRepositoriey";
import { UserRepository } from "../../../domain/repositories/IuserRepository";
import { Otpservice } from "../../../services/OTP/OtpService";
import { SmsOtpService } from "../../../services/OTP/phoneOtp";
import { EmailOtpService } from "../../../services/OTP/mailOtp";



@injectable()
export class UserProfileUpdate {
  constructor(
    @inject("CloudinaryService") private cloudinaryService: CloudinaryService,
    @inject("UserRepository") private userRepository: UserRepository,
    @inject("EmailOtpService") private emailOtp: EmailOtpService,
    @inject(Otpservice) private otpService: Otpservice,
    @inject("SmsOtpService") private smsOtp: SmsOtpService 
  ) {}
  async updateProfile(userId: string, newUserName?: string, NewProfileImage?: string) {
    let profile = "";
    
    if (NewProfileImage) {
      profile = await this.cloudinaryService.uploadUserProfile(NewProfileImage);
    }
  
    const updateData: Record<string, string> = {}; 
  
    if (newUserName) {
      updateData["userName"] = newUserName;
    }
  
    if (profile) {
      updateData["profileImage"] = profile; 
    }
  
    if (Object.keys(updateData).length === 0) {
      return false; 
    }
  
    const result = await this.userRepository.updateUserBasedId(userId, updateData); // Fix 3
    return result;
  }

  
  async sendEmailOtp(email: string): Promise<{ successMessage?: string; errorMessage?: string; auth?: string }> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (user) {
        return { errorMessage: "This email is already in use. Please enter a new one." };
      }
  
      const otp = this.otpService.generateOtp();
      this.otpService.saveOtp(email, otp);
      await this.emailOtp.sendEmail(email, otp);
  
      return { successMessage: `OTP sent successfully to ${email}`, auth: email }; // Included auth
    } catch (error) {
      console.error("Error in sendEmailOtp:", error);
      return { errorMessage: "Failed to send OTP. Please try again." };
    }
  }
  
  async sendSmsOtp(phone: string): Promise<{ successMessage?: string; errorMessage?: string; auth?: string }> {
    try {
      const user = await this.userRepository.findByPhone(phone);
      if (user) {
        return { errorMessage: "This phone number is already in use. Please enter a new one." }; // Corrected error message
      }
  
      const otp = this.otpService.generateOtp();
      this.otpService.saveOtp(phone, otp);
      await this.smsOtp.SendOtp(phone, otp);
  
      return { successMessage: `OTP sent successfully to ${phone}`, auth: phone }; // Included auth
    } catch (error) {
      console.error("Error in sendSmsOtp:", error);
      return { errorMessage: "Failed to send OTP. Please try again." };
    }
  }
}

