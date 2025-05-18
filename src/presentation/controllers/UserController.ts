import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { GetUserProfileUseCase } from "../../application/use-case/User/GetProfile"; 
import { TokenService } from "../../services/auth/TokenService"; 
import { HttpStatus } from "../../constants/HttpStatus"; 
import { UserProfileUpdate } from "../../application/use-case/User/updateProfile";

@injectable()
export class UserController {
  constructor(
    @inject(GetUserProfileUseCase) private getUserProfileUseCase: GetUserProfileUseCase,
    @inject(TokenService) private tokenService: TokenService,
    @inject(UserProfileUpdate)
    private readonly userProfileUpdate: UserProfileUpdate
  ) {}

  async getProfile(req: Request, res: Response): Promise<void> {
    try {
      if (req.params.id) {
        const user = await this.getUserProfileUseCase.execute(req.params.id);
        res.status(HttpStatus.OK).json({
          userAvatar: user?.profileImage,
          userName: user?.userName,
        });
        return;
      }

      const authHeader = req.headers.authorization;
      if (!authHeader) {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: "Unauthorized: No token provided" });
        return;
      }

      const token = authHeader.split(" ")[1];
      const decoded = await this.tokenService.verifyAccessToken(token);

      if (!decoded || !decoded.userId) {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: "User not found" });
        return;
      }

      const user = await this.getUserProfileUseCase.execute(decoded.userId);
      res.status(HttpStatus.OK).json({ user });

    } catch (error) {
      console.error("Error in getProfile:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
  }

  

  async updateProfile(req: Request, res: Response): Promise<void> {
    try {
      console.log("Request Body:", req.body);
      console.log("User ID:", req.params.userid);

      const { newEmail, newPhone, newUserName, NewProfileImage } = req.body;
      const userId = req.params.userid;

      if (!userId) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "User ID is required" });
        return;
      }

      if (newUserName || NewProfileImage) {
        await this.userProfileUpdate.updateProfile(userId, newUserName, NewProfileImage);
      }

      let otpResponse;

      if (newEmail) {
        otpResponse = await this.userProfileUpdate.sendEmailOtp(newEmail);
        if (otpResponse.errorMessage) {
          res
            .status(HttpStatus.BAD_REQUEST)
            .json({ message: otpResponse.errorMessage });
          return;
        }
        res
          .status(HttpStatus.NON_AUTHORITATIVE_INFORMATION)
          .json({ message: otpResponse.successMessage, auth: otpResponse.auth });
        return;
      }

      if (newPhone) {
        otpResponse = await this.userProfileUpdate.sendSmsOtp(newPhone);
        if (otpResponse.errorMessage) {
          res
            .status(HttpStatus.BAD_REQUEST)
            .json({ message: otpResponse.errorMessage });
          return;
        }
        res
          .status(HttpStatus.NON_AUTHORITATIVE_INFORMATION)
          .json({ message: otpResponse.successMessage, auth: otpResponse.auth });
        return;
      }

      res.status(HttpStatus.OK).json({ message: "Profile updated successfully" });
    } catch (error) {
      console.error("Error updating profile:", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  }
 




}