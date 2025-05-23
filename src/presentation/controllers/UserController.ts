import { Request, Response } from "express";
import { injectable, inject } from "tsyringe";
import { GetUserProfileUseCase } from "../../application/use-case/User/GetProfile";
import { TokenService } from "../../services/auth/TokenService";
import { HttpStatus } from "../../constants/HttpStatus";
import { UserProfileUpdate } from "../../application/use-case/User/updateProfile";

import { RegisterUser } from "../../application/use-case/User/auth/RegisterUser";
import { setAuthCookies } from "../../utils/setAuthCookies";
import { SignIn } from "../../application/use-case/User/auth/SignIn";
import { VerifyOtp } from "../../application/use-case/User/auth/VerifyOtp";
import { ResendOtp } from "../../application/use-case/User/auth/ResendOtp";
import { SendOtp } from "../../application/use-case/User/auth/forgotPassword/sendOtp";
import { ForgotVerifyOtp } from "../../application/use-case/User/auth/forgotPassword/forgotVerifyOtp";
import { NotificationUseCase } from "../../application/use-case/notification/NotificationUseCase ";
import { ResetPassword } from "../../application/use-case/User/auth/forgotPassword/resetPassword";
import { ProfileUpdateOtp } from "../../application/use-case/User/profileUpdateOtp";
import { GetServics } from "../../application/use-case/User/GetServics";
import { GetAllActiveService } from "../../application/use-case/User/getAllService";
import { GetAddress } from "../../application/use-case/User/Address/GetAddress";
import { AddNewAddress } from "../../application/use-case/User/Address/AddNewAddress";
import { EditAddress } from "../../application/use-case/User/Address/EditAddress";
import { DeleteAddress } from "../../application/use-case/User/Address/DeleteAddress";
import { AddReviewUseCase } from "../../application/use-case/bookService/AddReviewUseCase";
import { GetServiceProviderInfoUseCase } from "../../application/use-case/User/getServiceProviderInfoUseCase";

@injectable()
export class UserController {
  constructor(
  @inject(NotificationUseCase) private notificationUseCase: NotificationUseCase,
  @inject(RegisterUser) private registerUser: RegisterUser,
  @inject(SignIn) private signInUseCase: SignIn,
  @inject(VerifyOtp) private verifyOtpUseCase: VerifyOtp,
  @inject(ResendOtp) private resendOtpUseCase: ResendOtp,
  @inject(TokenService) private tokenService: TokenService,
  @inject(GetUserProfileUseCase) private getUserProfileUseCase: GetUserProfileUseCase,
  @inject(SendOtp) private sendOtpUseCase: SendOtp,
  @inject(ForgotVerifyOtp) private forgotVerifyOtpUseCase: ForgotVerifyOtp,
  @inject(ResetPassword) private resetPasswordUseCase: ResetPassword,
  @inject(UserProfileUpdate)private userProfileUpdate: UserProfileUpdate,
  @inject(ProfileUpdateOtp) private profileUpdateOtp: ProfileUpdateOtp ,
  @inject(GetServics) private getServics: GetServics,
  @inject(GetAllActiveService) private getAllActiveService: GetAllActiveService,
  @inject(GetAddress) private getAddressUseCase: GetAddress,
  @inject(AddNewAddress) private addNewAddressUseCase: AddNewAddress,
  @inject(EditAddress) private editAddressUseCase: EditAddress,
  @inject(DeleteAddress) private deleteAddressUseCase: DeleteAddress,
  @inject(AddReviewUseCase) private addReviewUseCase: AddReviewUseCase,
    @inject(GetServiceProviderInfoUseCase) private getServiceProviderInfoUseCase: GetServiceProviderInfoUseCase,


) {}
  getNotification = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = res.locals.user?.userId;
      if (!userId) {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: "User not found" });
        return;
      }

      const notification =
        await this.notificationUseCase.getNotification(userId);
      res.status(HttpStatus.OK).json(notification);
    } catch (error) {
      console.error(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  };

  deleteNotification = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = res.locals.user?.userId;
      const { id } = req.params;

      if (!userId || !id) {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: "User not found or missing ID" });
        return;
      }

      if (id === "deleteAll") {
        await this.notificationUseCase.delteAllNotification(userId);
        res
          .status(HttpStatus.OK)
          .json({ message: "All notifications deleted" });
      } else {
        await this.notificationUseCase.deleteSingleNotification(id);
        res.status(HttpStatus.OK).json({ message: "Notification deleted" });
      }
    } catch (error) {
      console.error(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  };

  markAsReadNotification = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Notification ID is required" });
        return;
      }

      await this.notificationUseCase.markAsRead(id);
      res
        .status(HttpStatus.OK)
        .json({ message: "Notification marked as read" });
    } catch (error) {
      console.error(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  };

  registerUserController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const { userName, email, password, phone } = req.body;

      if (!userName || !password) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Username and password are required" });
        return;
      }

      const data: {
        userName: string;
        password: string;
        phone?: string;
        email?: string;
      } = {
        userName,
        password,
      };

      if (phone) {
        data.phone = phone;
      } else if (email) {
        data.email = email;
      } else {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Either phone or email is required" });
        return;
      }

      const result = await this.registerUser.execute(data);

      if (result.user) {
        const regInfo = result.user.phone
          ? result.user.phone
          : result.user.email;
        const message = result.user.phone
          ? "OTP sent to phone"
          : "Your account has been successfully created";

        res.status(HttpStatus.CREATED).json({ message, regInfo });
      } else if (result.errorMessage) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: result.errorMessage });
      }
    } catch (error: unknown) {
      let errorMessage = "";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.error("Registration error:", errorMessage);
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: errorMessage || "An unexpected error occurred" });
    }
  };

  signInUserController = async (req: Request, res: Response): Promise<void> => {
    const { method } = req.params;

    try {
      if (method === "email") {
        const { email, password } = req.body;

        if (!email || !password) {
          res
            .status(HttpStatus.BAD_REQUEST)
            .json({ error: "Email and password are required" });
          return;
        }

        const result = await this.signInUseCase.signInWithEmail(
          email,
          password
        );

        if (result?.errorOtp) {
          res
            .status(HttpStatus.BAD_REQUEST)
            .json({ errorOtp: result.errorOtp });
          return;
        }

        if (result?.errorMessage) {
          res
            .status(HttpStatus.UNAUTHORIZED)
            .json({ error: result.errorMessage });
          return;
        }

        if (result?.refreshToken) {
          setAuthCookies(res, result.refreshToken);
        }

        res.status(HttpStatus.OK).json({ accessToken: result?.accessToken });
        return;
      }

      if (method === "phone") {
        const { phone, password } = req.body;

        if (!phone || !password) {
          res
            .status(HttpStatus.BAD_REQUEST)
            .json({ error: "Phone and password are required" });
          return;
        }

        const result = await this.signInUseCase.signInWithPhone(
          phone,
          password
        );

        if (result?.errorOtp) {
          res
            .status(HttpStatus.BAD_REQUEST)
            .json({ errorOtp: result.errorOtp });
          return;
        }

        if (result?.errorMessage) {
          res
            .status(HttpStatus.UNAUTHORIZED)
            .json({ error: result.errorMessage });
          return;
        }

        if (result?.refreshToken) {
          setAuthCookies(res, result.refreshToken);
        }

        res.status(HttpStatus.OK).json({ accessToken: result?.accessToken });
        return;
      }

      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: "Invalid login method" });
    } catch (error) {
      console.error(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  };

  verifyOtpController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { otp, sender } = req.body;

      const result = await this.verifyOtpUseCase.execute(sender, otp);
      console.log(result);

      if (result.success) {
        res.status(HttpStatus.OK).json({ message: result.success });
      } else if (result.errorMessage) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ errorMessage: result.errorMessage });
      }
    } catch (error) {
      console.error(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  };

  resendOtpController = async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.body.email) {
        const result = await this.resendOtpUseCase.sendEmailOtp(req.body.email);
        console.log(result);
        res.status(HttpStatus.OK).json({ message: result });
        return;
      } else if (req.body.phone) {
        const result = await this.resendOtpUseCase.sendSmsOtp(req.body.phone);
        res.status(HttpStatus.OK).json({ message: result });
        return;
      } else {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ errorMessage: "Email or phone is required" });
      }
    } catch (error) {
      console.error(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  };

  userProfileController = async (
    req: Request,
    res: Response
  ): Promise<void> => {
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
        res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: "Unauthorized: No token provided" });
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
      console.error("Error in userProfile:", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  };

  sendOtpController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, phone } = req.body;

      if (!email && !phone) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Email or phone number is required" });
        return;
      }

      if (email) {
        const message = await this.sendOtpUseCase.sendEmailOtp(email);
        if (message.successMessage) {
          res.status(HttpStatus.OK).json({ message });
          return;
        }
        if (message.errorMessage) {
          res
            .status(HttpStatus.BAD_REQUEST)
            .json({ message: message.errorMessage });
          return;
        }
      }

      if (phone) {
        const message = await this.sendOtpUseCase.sendSmsOtp(phone);
        if (message.successMessage) {
          res.status(HttpStatus.OK).json({ message });
          return;
        }
        if (message.errorMessage) {
          res
            .status(HttpStatus.BAD_REQUEST)
            .json({ message: message.errorMessage });
          return;
        }
      }
    } catch (error) {
      console.error("sendOtp error:", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong. Please try again later." });
    }
  };

     forgotVerifyOtp = async (req: Request, res: Response): Promise<void> => {
    try {
      const { otp, key } = req.body;

      if (!otp || !key) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: "OTP and key are required." });
        return;
      }

      const result = await this.forgotVerifyOtpUseCase.execute(otp, key);

      if (result === true) {
        res.status(HttpStatus.OK).json({ message: "OTP verified successfully." });
      } else {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: "OTP expired or invalid." });
      }
    } catch (error) {
      console.error("Error in verifyOtp:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong. Please try again later." });
    }
  };



async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { password, email, phone } = req.body;

      if (!password) {
        res.status(HttpStatus.BAD_REQUEST).json({ Message: 'Password is required' });
        return;
      }

      if (!email && !phone) {
        res.status(HttpStatus.BAD_REQUEST).json({ Message: 'Email or phone is required' });
        return;
      }

      let result;

      if (email) {
        result = await this.resetPasswordUseCase.resetPasswordEmail(password, email);
      } else {
        result = await this.resetPasswordUseCase.resetPasswordPhone(password, phone);
      }

      res.status(HttpStatus.OK).json({ Message: result });
    } catch (error) {
      console.error("Error in resetPassword:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        Message: "Something went wrong. Please try again later."
      });
    }
  }


userProfileUpdateController = async (req: Request, res: Response) => {
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

    return;
  } catch (error) {
    console.error("Error updating profile:", error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
    return;
  }
};

profileUpdateOtpController = async (req: Request, res: Response) => {
    try {
      const { userId, key, otp } = req.body;

      const result = await this.profileUpdateOtp.execute(userId, key, otp);

      if (result.success) {
        res.status(HttpStatus.OK).json({ message: result.success });
      } else if (result.errorMessage) {
        res.status(HttpStatus.BAD_REQUEST).json({ errorMessage: result.errorMessage });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ errorMessage: "Internal server error" });
      }
    } catch (error) {
      console.error("Error in profileUpdateOtp:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ errorMessage: "Internal server error" });
    }
  };





  logoutUserController = async (req: Request, res: Response) => {
    try {
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      if (req.cookies.serviceProviderToken) {
        res.clearCookie("serviceProviderToken", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
      }

      res.status(HttpStatus.OK).json({ message: "User logged out successfully" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
  };


 getSingleServiceHandler = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      console.log(id);

      if (!id) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: "Service ID is required" });
        return;
      }

      const data = await this.getServics.execute(id);

      if (!data.services) {
        res.status(HttpStatus.NOT_FOUND).json({ message: "Service not found" });
        return;
      }

      res.status(HttpStatus.OK).json(data);
    } catch (error) {
      console.error("Error fetching service:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
  };


public userProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.params.id) {
        const user = await this.getUserProfileUseCase.execute(req.params.id);
        res.status(HttpStatus.OK).json({
          userAvatar: user?.profileImage,
          userName: user?.userName,
        });
        return;
      } else {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
          res.status(401).json({ message: "Unauthorized: No token provided" });
          return;
        }
        const token = authHeader.split(" ")[1];
        const decoded = await this.tokenService.verifyAccessToken(token);

        if (!decoded || !decoded.userId) {
          res.status(401).json({ message: "User not found" });
          return;
        }

        const user = await this.getUserProfileUseCase.execute(decoded.userId);

        res.status(200).json({ user });
      }
    } catch (error) {
      console.error("Error in userProfile:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
  };



public getActiveServices = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log(req.query);

      const userLongitude = Number(req.query.userLongitude);
      const userLatitude = Number(req.query.userLatitude);

      let result;

      if (!isNaN(userLongitude) && !isNaN(userLatitude)) {
        result = await this.getAllActiveService.getNearByservices(userLongitude, userLatitude);
      } else {
        result = await this.getAllActiveService.execute();
      }

      res.status(HttpStatus.OK).json({ allServices: result });
      return;
    } catch (e) {
      console.error(e);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "An error occurred while fetching services." });
      return;
    }
  };


public getAddress = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = res.locals.user?.userId;

      console.log("User ID:", userId);

      if (!userId) {
        res.status(401).json({ message: "Unauthorized: User ID missing" });
        return;
      }

      const allAddress = await this.getAddressUseCase.execute(userId);

      res.status(200).json({ allAddress });
      return;
    } catch (error: any) {
      console.error("Error fetching address:", error.message || error);
      res.status(500).json({ message: "Failed to fetch address" });
      return;
    }
  };

public addNewAddress = async (req: Request, res: Response): Promise<void> => {
    try {
      const { address } = req.body;
      const userId = res.locals.user?.userId;

      console.log(userId, address);

      if (!userId) {
        res.status(401).json({ message: "Unauthorized: User ID missing" });
        return;
      }

      if (!address) {
        res.status(400).json({ message: "Address is required" });
        return;
      }

      const result = await this.addNewAddressUseCase.execute(userId, address);
      console.log(result);

      res.status(200).json({ message: "Address added successfully" });
      return;
    } catch (error) {
      console.error("Error adding new address:", error);
      res.status(500).json({ message: "Failed to add new address" });
      return;
    }
  };

 public editAddress = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log('-9-0-0-0-0-0-0-0-0');
      console.log(req.body);

      const { address } = req.body;
      const userId = res.locals.user?.userId;

      console.log("User ID:", userId, "Updated Address:", address);

      if (!userId) {
        res.status(401).json({ message: "Unauthorized: User ID missing" });
        return;
      }

      if (!address) {
        res.status(400).json({ message: "Updated address data is required" });
        return;
      }

      await this.editAddressUseCase.execute(userId, address);

      res.status(200).json({ message: "Address updated successfully" });
      return;
    } catch (error) {
      console.error("Error updating address:", error);
      res.status(500).json({ message: "Failed to update address" });
      return;
    }
  };



public deleteAddress = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const userId = res.locals.user?.userId;

      console.log("User ID:", userId, "Address ID:", id);

      if (!userId) {
        res.status(401).json({ message: "Unauthorized: User ID missing" });
        return;
      }

      if (!id) {
        res.status(400).json({ message: "Address ID is required" });
        return;
      }

      await this.deleteAddressUseCase.execute(userId, id);

      res.status(200).json({ message: "Address deleted successfully" });
      return;
    } catch (error) {
      console.error("Error deleting address:", error);
      res.status(500).json({ message: "Failed to delete address" });
      return;
    }
  
  

  };


public addReview = async (req: Request, res: Response): Promise<void> => {
    try {
      const { bookedServiceId, serviceId, rating, comment } = req.body;
      console.log(req.body);

      if (!bookedServiceId || !serviceId || rating === undefined) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: "bookedServiceId, serviceId, and rating are required.",
        });
        return;
      }

      if (comment && typeof comment !== "string") {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: "Comment must be a string.",
        });
        return;
      }

      await this.addReviewUseCase.execute(bookedServiceId, serviceId, rating, comment);

      res.status(HttpStatus.CREATED).json({ message: "Review added successfully!" });
    } catch (error) {
      console.error("Error adding review:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Failed to add review." });
    }
  };


  public getServiceProviderInfoChat = async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.params.id) {
        const user = await this.getServiceProviderInfoUseCase.execute(req.params.id);
        res.status(HttpStatus.OK).json({
          userAvatar: user?.profileImage,
          userName: user?.serviceProviderName,
        });
        return;
      }
      res.status(HttpStatus.BAD_REQUEST).json({ message: "Service provider ID is required" });
    } catch (error) {
      console.error("Error in getServiceProviderInfoChat:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
  };


}
