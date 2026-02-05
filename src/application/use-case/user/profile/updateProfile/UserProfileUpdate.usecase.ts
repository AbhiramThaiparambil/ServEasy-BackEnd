import { injectable, inject } from "tsyringe";
import {
  REPOSITORY_TOKENS,
  SERVICE_TOKENS,
} from "../../../../../constants/tokens";
import { ICloudinaryService } from "../../../../../services/cloudinary/ICloudinaryService";
import { IUserRepository } from "../../../../../domain/repositories/IuserRepository";
import { IEmailService } from "../../../../../services/mailService/IEmailService";
import { IOtpService } from "../../../../../services/otp/IOtpService";
import { ISmsOtpService } from "../../../../../services/otp/ISmsOtpService";
import {
  IUpdateProfileResult,
  IUserProfileUpdateUseCase,
} from "./IUserProfileUpdate.usecase";
import {
  UpdateProfileRequestDTO,
  ProfileOtpResponseDTO,
} from "../../../../../application/dtos/user/profile/UserProfileDTO";

@injectable()
export class UserProfileUpdateUseCase implements IUserProfileUpdateUseCase {
  constructor(
    @inject(SERVICE_TOKENS.CloudinaryService)
    private cloudinaryService: ICloudinaryService,
    @inject(REPOSITORY_TOKENS.UserRepository)
    private userRepository: IUserRepository,
    @inject(SERVICE_TOKENS.EmailService) private emailOtp: IEmailService,
    @inject(SERVICE_TOKENS.OtpService) private otpService: IOtpService,
    @inject(SERVICE_TOKENS.SmsOtpService) private smsOtp: ISmsOtpService,
  ) {}
  async updateProfile(
    request: UpdateProfileRequestDTO
  ): Promise<IUpdateProfileResult> {
    const {
      userId,
      newUserName,
      newProfileImage,
      newPassword,
      oldPassword,
    } = request;

    let profile = "";

    if (newProfileImage) {
      profile = await this.cloudinaryService.uploadUserProfile(newProfileImage);
    }

    const updateData: Record<string, string> = {};

    if (newUserName) {
      updateData["userName"] = newUserName;
    }

    if (profile) {
      updateData["profileImage"] = profile;
    }

    if (newPassword && oldPassword) {
      const user = await this.userRepository.findById(userId);
      if (user) {
        console.log();
        const isCorrect = await this.userRepository.comparePassword(
          oldPassword,
          user.password,
        );
        console.log(isCorrect);
        if (isCorrect) {
          console.log(newPassword);
          const hashPassword =
            await this.userRepository.HashPassword(newPassword);
          updateData["password"] = hashPassword;
        } else {
          if (!isCorrect) {
            return {
              updated: false,
              message: "Old password is incorrect",
            };
          }
        }
      }
    }

    if (Object.keys(updateData).length === 0) {
      return {
        updated: false,
        message: "No changes detected to update.",
      };
    }
    const result = await this.userRepository.updateUserBasedId(
      userId,
      updateData,
    );

    return { updated: true, result: result };
  }

  async sendEmailOtp(email: string): Promise<ProfileOtpResponseDTO> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (user) {
        return {
          errorMessage: "This email is already in use. Please enter a new one.",
        };
      }

      const otp = this.otpService.generateOtp();
      this.otpService.saveOtp(email, otp);
      await this.emailOtp.sendOtpEmail(email, otp);

      return {
        successMessage: `OTP sent successfully to ${email}`,
        auth: email,
      };
    } catch (error) {
      console.error("Error in sendEmailOtp:", error);
      return { errorMessage: "Failed to send OTP. Please try again." };
    }
  }

  async sendSmsOtp(phone: string): Promise<ProfileOtpResponseDTO> {
    try {
      const user = await this.userRepository.findByPhone(phone);
      if (user) {
        return {
          errorMessage:
            "This phone number is already in use. Please enter a new one.",
        };
      }

      const otp = this.otpService.generateOtp();
      this.otpService.saveOtp(phone, otp);
      await this.smsOtp.SendOtp(phone, otp);

      return {
        successMessage: `OTP sent successfully to ${phone}`,
        auth: phone,
      };
    } catch (error) {
      console.error("Error in sendSmsOtp:", error);
      return { errorMessage: "Failed to send OTP. Please try again." };
    }
  }
}
