import { Request, Response } from "express";
import { getString } from "../../utils/requestUtils";
import { injectable, inject } from "tsyringe";
import { HttpStatus } from "../../constants/HttpStatus";
import { getErrorMessage } from "../../utils/errorUtils";

import { setAuthCookies } from "../../utils/setAuthCookies";
import { SignIn } from "../../application/use-case/user/auth/signIn/SignIn.usecase";

import { SERVICE_TOKENS, USE_CASE_TOKENS } from "../../constants/tokens";
import { IFindFeaturedCouponsUseCase } from "../../application/use-case/user/coupon/FeaturedCoupons/IFindFeaturedCoupons.usecase";
import { IIncreaseAdClicksUseCase } from "../../application/use-case/user/ads/increaseAdclicks/IIncreaseAdClicksUseCase";
import { ITokenService } from "../../services/token/ITokenService";
import { IGetNotificationUseCase } from "../../application/use-case/common/notification/getNotification/IGetNotification.usecase";
import { IDeleteAllNotificationUseCase } from "../../application/use-case/common/notification/deleteAllNotification/IDeleteAllNotification.usecase";
import { IDeleteSingleNotificationUseCase } from "../../application/use-case/common/notification/deleteSingleNotification/IDeleteSingleNotification.usecase";
import { IMarkNotificationAsReadUseCase } from "../../application/use-case/common/notification/markNotificationAsRead/IMarkNotificationAsRead.usecase";
import { GetNotificationsRequestDTO } from "../../application/dtos/common/notification/getNotification/GetNotificationDTO";
import { DeleteAllNotificationsRequestDTO } from "../../application/dtos/common/notification/deleteAllNotification/DeleteAllNotificationDTO";
import { DeleteSingleNotificationRequestDTO } from "../../application/dtos/common/notification/deleteSingleNotification/DeleteSingleNotificationDTO";
import { MarkNotificationAsReadRequestDTO } from "../../application/dtos/common/notification/markNotificationAsRead/MarkNotificationAsReadDTO";
import { IAddReviewUseCase } from "../../application/use-case/user/review/addReview/IAddReviewUseCase";
import { IGetAddress } from "../../application/use-case/user/address/getAddress/IGetAddress.usecase";
import { IAddNewAddress } from "../../application/use-case/user/address/addAddress/IAddNewAddress.usecase";
import { IEditAddress } from "../../application/use-case/user/address/editAddress/IEditAddress.usecase";
import { IDeleteAddress } from "../../application/use-case/user/address/deleteAddress/IDeleteAddress.usecase";
import { IRecommendAdsUseCase } from "../../application/use-case/user/ads/recommendAds/IRecommendAdsUseCase";
import { ISignUpUseCase } from "../../application/use-case/user/auth/signUp/ISignUp.usecase";
import { IVerifyOtpUseCase } from "../../application/use-case/user/auth/verifyOtp/IVerifyOtp.usecase";
import { IResendOtp } from "../../application/use-case/user/auth/resendOtp/IResendOtp.usecase";
import { IVerifyForgotPasswordOtpUseCase } from "../../application/use-case/user/auth/forgotPassword/verifyForgotPasswordOtp/IVerifyForgotPasswordOtp.usecase";
import { IResetPasswordUseCase } from "../../application/use-case/user/auth/forgotPassword/resetPassword/IResetPassword.usecase";
import { ISendForgotPasswordOtpUseCase } from "../../application/use-case/user/auth/forgotPassword/sendForgotPasswordOtp/ISendForgotPasswordOtp.usecase";
import { IGoogleAuthUseCase } from "../../application/use-case/user/auth/googleAuth/IGoogleAuth.usecase";
import { IGetServiceProviderInfoUseCase } from "../../application/use-case/user/service/getProviderInfo/IGetServiceProviderInfo.usecase";
import { IGetSingleServiceUseCase } from "../../application/use-case/user/service/getSingleService/IGetSingleServics.usecase";
import { IGetAllActiveServiceUseCase } from "../../application/use-case/user/service/getService/IGetAllActiveService.usecase";
import { IUserProfileUpdateUseCase } from "../../application/use-case/user/profile/updateProfile/IUserProfileUpdate.usecase";
import { IProfileUpdateOtpUseCase } from "../../application/use-case/user/profile/updateProfile/IProfileUpdateOtp.usecase";
import { IGetUserProfileUseCase } from "../../application/use-case/user/profile/getProfile/IGetUserProfile.usecase";
import { IFindAllActiveCouponsUseCase } from "../../application/use-case/user/coupon/findAllActiveCoupons/IFindAllActiveCoupons.usecase";
import { IApplyCouponToBookingUseCase } from "../../application/use-case/user/coupon/applyCoupon/IApplyCouponToBooking.usecase";
import { IRemoveCouponToBookingUseCase } from "../../application/use-case/user/coupon/removeCoupon/IRemoveCoupon.usecase";
import { IUserSiteSettings } from "../../application/use-case/user/site-settings/IUserSiteSettings";
import {
  UpdateProfileRequestDTO,
} from "../../application/dtos/user/profile/UpdateProfileDTO";
import { SignUpRequestDTO } from "../../application/dtos/user/auth/signUp/SignUpDTO";
import { SignInRequestDTO } from "../../application/dtos/user/auth/signIn/SignInDTO";
import { ResetPasswordRequestDTO } from "../../application/dtos/user/auth/forgotPassword/ResetPasswordDTO";
import { GoogleAuthRequestDTO } from "../../application/dtos/user/auth/googleAuth/GoogleAuthDTO";
import { SendOtpRequestDTO } from "../../application/dtos/user/auth/resendOtp/ResendOtpDTO";
import { VerifyOtpRequestDTO } from "../../application/dtos/user/auth/verifyOtp/VerifyOtpDTO";
import { IncreaseAdClicksRequestDTO } from "../../application/dtos/user/ads/increaseAdClicks/IncreaseAdClicksDTO";
import { GetRecommendedAdsRequestDTO } from "../../application/dtos/user/ads/recommendAds/RecommendAdsDTO";
import {
  AddAddressRequestDTO,
  EditAddressRequestDTO,
  GetAddressRequestDTO,
  DeleteAddressRequestDTO,
} from "../../application/dtos/user/address/AddressDTO";
import {
  GetFeaturedCouponsRequestDTO,
  GetAllActiveCouponsResponseDTO,
  ApplyCouponRequestDTO,
  RemoveCouponRequestDTO,
} from "../../application/dtos/user/coupon/CouponDTO";
import { IAutoSuggestion } from "../../application/use-case/user/location/IAutoSuggestion";
import { GetAutoSuggestionRequestDTO } from "../../application/dtos/user/location/LocationDTO";

import { AddReviewRequestDTO } from "../../application/dtos/user/review/ReviewDTO";
import { GetThemesResponseDTO, GetBannersResponseDTO } from "../../application/dtos/user/site-settings/SiteSettingsDTO";
import { GetSingleServiceRequestDTO } from "../../application/dtos/user/service/getSingleService/GetSingleServiceDTO";
import { GetNearbyServicesRequestDTO, GetAllActiveServicesRequestDTO } from "../../application/dtos/user/service/getService/GetAllActiveServiceDTO";
import { GetServiceProviderInfoRequestDTO } from "../../application/dtos/user/service/getProviderInfo/GetServiceProviderInfoDTO";

@injectable()
export class UserController {
  constructor(
    @inject(USE_CASE_TOKENS.MarkNotificationAsReadUseCase)
    private markAsRead: IMarkNotificationAsReadUseCase,

    @inject(USE_CASE_TOKENS.DeleteSingleNotificationUseCase)
    private deleteSingleNotification: IDeleteSingleNotificationUseCase,

    @inject(USE_CASE_TOKENS.DeleteAllNotificationUseCase)
    private delteAllNotification: IDeleteAllNotificationUseCase,

    @inject(USE_CASE_TOKENS.GetNotificationUseCase)
    private getNotificationUsecase: IGetNotificationUseCase,

    @inject(USE_CASE_TOKENS.SignUpUseCase) private registerUser: ISignUpUseCase,
    @inject(SignIn) private signInUseCase: SignIn,

    @inject(USE_CASE_TOKENS.VerifyOtpUseCase)
    private verifyOtpUseCase: IVerifyOtpUseCase,

    @inject(USE_CASE_TOKENS.ResendOtpUseCase)
    private resendOtpUseCase: IResendOtp,

    @inject(SERVICE_TOKENS.TokenService) private tokenService: ITokenService,
    @inject(USE_CASE_TOKENS.GetUserProfileUseCase)
    private getUserProfileUseCase: IGetUserProfileUseCase,
    @inject(USE_CASE_TOKENS.SendForgotPasswordOtpUseCase)
    private sendOtpUseCase: ISendForgotPasswordOtpUseCase,
    @inject(USE_CASE_TOKENS.VerifyForgotPasswordOtpUseCase)
    private forgotVerifyOtpUseCase: IVerifyForgotPasswordOtpUseCase,
    @inject(USE_CASE_TOKENS.ResetPasswordUseCase)
    private resetPasswordUseCase: IResetPasswordUseCase,
    @inject(USE_CASE_TOKENS.UserProfileUpdateUseCase)
    private userProfileUpdate: IUserProfileUpdateUseCase,
    @inject(USE_CASE_TOKENS.ProfileUpdateOtpUseCase)
    private profileUpdateOtp: IProfileUpdateOtpUseCase,
    @inject(USE_CASE_TOKENS.GetSingleServiceUseCase)
    private getServics: IGetSingleServiceUseCase,
    @inject(USE_CASE_TOKENS.GetAllActiveServiceUseCase)
    private getAllActiveService: IGetAllActiveServiceUseCase,

    @inject(USE_CASE_TOKENS.GetAddress) private getAddressUseCase: IGetAddress,
    @inject(USE_CASE_TOKENS.AddNewAddress)
    private addNewAddressUseCase: IAddNewAddress,
    @inject(USE_CASE_TOKENS.EditAddress)
    private editAddressUseCase: IEditAddress,
    @inject(USE_CASE_TOKENS.DeleteAddress)
    private deleteAddressUseCase: IDeleteAddress,
    @inject(USE_CASE_TOKENS.AddReviewUseCase)
    private addReviewUseCase: IAddReviewUseCase,
    @inject(USE_CASE_TOKENS.GetServiceProviderInfoUseCase)
    private getServiceProviderInfoUseCase: IGetServiceProviderInfoUseCase,
    @inject(USE_CASE_TOKENS.UserSiteSettings)
    private userSiteSettings: IUserSiteSettings,

    @inject(USE_CASE_TOKENS.FindFeaturedCouponsUseCase)
    private findFeatureCouponsUseCase: IFindFeaturedCouponsUseCase,

    @inject(USE_CASE_TOKENS.RecommendAdsUseCase)
    private recommendAdsUseCase: IRecommendAdsUseCase,

    @inject(USE_CASE_TOKENS.IncreaseAdClicksUseCase)
    private increaseAdClicksUseCase: IIncreaseAdClicksUseCase,
    @inject(USE_CASE_TOKENS.GoogleAuthUseCase)
    private googleAuthUseCase: IGoogleAuthUseCase,

    @inject(USE_CASE_TOKENS.FindAllActiveCouponsUseCase)
    private findActiveCouponsusecase: IFindAllActiveCouponsUseCase,

    @inject(USE_CASE_TOKENS.ApplyCouponToBookingUseCase)
    private applyCouponUseCase: IApplyCouponToBookingUseCase,

    @inject(USE_CASE_TOKENS.RemoveCouponToBookingUseCase)
    private removeCouponUseCase: IRemoveCouponToBookingUseCase,

    @inject(USE_CASE_TOKENS.AutoSuggestion)
    private autoSuggestionUseCase: IAutoSuggestion
  ) {}
  refreshToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const { refreshToken } = req.cookies;

      if (!refreshToken) {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ error: "Refresh token is missing" });
        return;
      }

      const decoded = this.tokenService.verifyRefreshToken(refreshToken);
      if (!decoded) {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ error: "Invalid refresh token" });
        return;
      }

      const response = await this.getUserProfileUseCase.execute(decoded.userId);
      const user = response.user;

      if (!user) {
        res.status(HttpStatus.NOT_FOUND).json({ error: "User not found" });
        return;
      }

      const newAccessToken = await this.tokenService.generateAccessToken(
        user._id + "",
        "userId",
      );

      res.status(HttpStatus.OK).json({ accessToken: newAccessToken });
    } catch (error: unknown) {
      console.error("RefreshToken error:", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  };

  getNotification = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = res.locals.user?.userId;
      if (!userId) {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: "User not found" });
        return;
      }

      const dto: GetNotificationsRequestDTO = { userId: userId };
      const notification = await this.getNotificationUsecase.execute(dto);
      res.status(HttpStatus.OK).json(notification);
    } catch (error: unknown) {
      console.error(getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  };

  deleteNotification = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = res.locals.user?.userId;
      const id = getString(req.params.id);

      if (!userId || !id) {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: "User not found or missing ID" });
        return;
      }

      if (id === "deleteAll") {
        const dto: DeleteAllNotificationsRequestDTO = { userId };
        await this.delteAllNotification.execute(dto);
        res
          .status(HttpStatus.OK)
          .json({ message: "All notifications deleted" });
      } else {
        const dto: DeleteSingleNotificationRequestDTO = { notificationId: id };
        await this.deleteSingleNotification.execute(dto);
        res.status(HttpStatus.OK).json({ message: "Notification deleted" });
      }
    } catch (error: unknown) {
      console.error(getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  };

  markAsReadNotification = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const id = getString(req.params.id);
      if (!id) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Notification ID is required" });
        return;
      }

      const dto: MarkNotificationAsReadRequestDTO = { notificationId: id };
      await this.markAsRead.execute(dto);
      res
        .status(HttpStatus.OK)
        .json({ message: "Notification marked as read" });
    } catch (error: unknown) {
      console.error(getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  };

  registerUserController = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const { userName, email, password, phone } = req.body;

      if (!userName || !password) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Username and password are required" });
        return;
      }

      const dto: SignUpRequestDTO = {
        userName,
        password,
        phone,
        email,
      };

      if (!dto.phone && !dto.email) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Either phone or email is required" });
        return;
      }

      const result = await this.registerUser.execute(dto);
      if ("errorMessage" in result) {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ error: result.errorMessage });
        return;
      }

      const regInfo = result.user.phone ? result.user.phone : result.user.email;
      const message = result.user.phone
        ? "OTP sent to phone"
        : "Your account has been successfully created";

      res.status(HttpStatus.CREATED).json({ message, regInfo });
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      console.error("Registration error:", errorMessage);
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: errorMessage || "An unexpected error occurred" });
    }
  };

  googleAuthController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { googleToken } = req.body;

      if (!googleToken) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Google token is required" });
        return;
      }

      const dto: GoogleAuthRequestDTO = { googleToken };
      const result = await this.googleAuthUseCase.execute(dto);

      setAuthCookies(res, "refreshToken", result.refreshToken);

      res.status(HttpStatus.OK).json({
        accessToken: result.accessToken,
      });
    } catch (error: unknown) {
      console.error("Google auth error:", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Google authentication failed" });
    }
  };

  signInUserController = async (req: Request, res: Response): Promise<void> => {
    const method = getString(req.params.method);

    try {
      if (method === "email") {
        const { email, password } = req.body;

        if (!email || !password) {
          res
            .status(HttpStatus.BAD_REQUEST)
            .json({ error: "Email and password are required" });
          return;
        }

        const dto: SignInRequestDTO = {
            email,
            password
        };

        const result = await this.signInUseCase.signInWithEmail(dto);

        if ("errorMessage" in result) {
          res
            .status(HttpStatus.UNAUTHORIZED)
            .json({ error: result.errorMessage });
          return;
        }
        if (result?.refreshToken) {
          setAuthCookies(res, "refreshToken", result.refreshToken);
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

        const dto: SignInRequestDTO = {
            phone,
            password
        };

        const result = await this.signInUseCase.signInWithPhone(dto);

        if ("errorMessage" in result) {
          res
            .status(HttpStatus.UNAUTHORIZED)
            .json({ error: result.errorMessage });
          return;
        }

        if (result?.refreshToken) {
          setAuthCookies(res, "refreshToken", result.refreshToken);
        }

        res.status(HttpStatus.OK).json({ accessToken: result?.accessToken });
        return;
      }

      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: "Invalid login method" });
    } catch (error: unknown) {
      console.error(getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  };

  verifyOtpController = async (req: Request, res: Response): Promise<void> => {
    try {
      const { otp, sender } = req.body;

      const dto: VerifyOtpRequestDTO = { otp, sender };
      const result = await this.verifyOtpUseCase.execute(dto);
      console.log(result);

      if ("errorMessage" in result) {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ error: result.errorMessage });
        return;
      }

      setAuthCookies(res, "refreshToken", result.refreshToken);

      res
        .status(HttpStatus.OK)
        .json({ message: result.success, accessToken: result.accessToken });
    } catch (error: unknown) {
      console.error(getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  };

  resendOtpController = async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.body.email) {
        const dto: SendOtpRequestDTO = { email: req.body.email };
        const result = await this.resendOtpUseCase.sendEmailOtp(dto);
        console.log(result);
        res.status(HttpStatus.OK).json({ message: result });
        return;
      } else if (req.body.phone) {
        const dto: SendOtpRequestDTO = { phone: req.body.phone };
        const result = await this.resendOtpUseCase.sendSmsOtp(dto);
        res.status(HttpStatus.OK).json({ message: result });
        return;
      } else {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ errorMessage: "Email or phone is required" });
      }
    } catch (error: unknown) {
      console.error(getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  };

  userProfileController = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      if (getString(req.params.id)) {
        const response = await this.getUserProfileUseCase.execute(getString(req.params.id));
        const user = response.user;
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

      const response = await this.getUserProfileUseCase.execute(decoded.userId);
      res.status(HttpStatus.OK).json({ user: response.user });
    } catch (error: unknown) {
      console.error("Error in userProfile:", getErrorMessage(error));
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
      }

      if (email) {
        const dto: SendOtpRequestDTO = { email };
        const message = await this.sendOtpUseCase.sendEmailOtp(dto);
        if (message.successMessage) {
          res.status(HttpStatus.OK).json({ message });
        }
        if (message.errorMessage) {
          res
            .status(HttpStatus.BAD_REQUEST)
            .json({ message: message.errorMessage });
        }
      }

      if (phone) {
        const dto: SendOtpRequestDTO = { phone };
        const message = await this.sendOtpUseCase.sendSmsOtp(dto);
        if (message.successMessage) {
          res.status(HttpStatus.OK).json({ message });
        }
        if (message.errorMessage) {
          res
            .status(HttpStatus.BAD_REQUEST)
            .json({ message: message.errorMessage });
        }
      }
    } catch (error: unknown) {
      console.error("sendOtp error:", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong. Please try again later." });
    }
  };

  forgotVerifyOtp = async (req: Request, res: Response): Promise<void> => {
    try {
      const { otp, key } = req.body;

      console.log(console.log(req.body));

      if (!otp || !key) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "OTP and key are required." });
        return;
      }

      const dto: VerifyOtpRequestDTO = { otp, sender: key };
      const result = await this.forgotVerifyOtpUseCase.execute(dto);

      if (result === true) {
        res
          .status(HttpStatus.OK)
          .json({ message: "OTP verified successfully." });
      } else {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: "OTP expired or invalid." });
      }
    } catch (error: unknown) {
      console.error("Error in verifyOtp:", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong. Please try again later." });
    }
  };

  resetPassword = async (req: Request, res: Response): Promise<void> => {
    try {
      const { password, email, phone } = req.body;
      if (!password) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ Message: "Password is required" });
        return;
      }

      if (!email && !phone) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ Message: "Email or phone is required" });
        return;
      }

      let result;

      if (email) {
        const dto: ResetPasswordRequestDTO = { newPassword: password, email };
        result = await this.resetPasswordUseCase.resetPasswordEmail(dto);
      } else {
        const dto: ResetPasswordRequestDTO = { newPassword: password, phone };
        result = await this.resetPasswordUseCase.resetPasswordPhone(dto);
      }

      res.status(HttpStatus.OK).json({ Message: result });
    } catch (error: unknown) {
      console.error("Error in resetPassword:", getErrorMessage(error));
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        Message: "Something went wrong. Please try again later.",
      });
    }
  };

  userProfileUpdateController = async (req: Request, res: Response) => {
    try {
      const {
        newEmail,
        newPhone,
        newUserName,
        NewProfileImage,
        newPassword,
        oldPassword,
      } = req.body;
      const userId = getString(req.params.userid);

      if (!userId) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "User ID is required" });
        return;
      }

      if (newUserName || NewProfileImage || newPassword || oldPassword) {
        const dto: UpdateProfileRequestDTO = {
            userId,
            newUserName,
            newProfileImage: NewProfileImage,
            newPassword,
            oldPassword
        };

        const update = await this.userProfileUpdate.updateProfile(dto);

        if (!update.updated) {
          res.status(HttpStatus.BAD_REQUEST).json({ message: update.message });
          return;
        }

        res
          .status(HttpStatus.OK)
          .json({ message: "Profile updated successfully" });
        return;
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
        res.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({
          message: otpResponse.successMessage,
          auth: otpResponse.auth,
        });
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
        res.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({
          message: otpResponse.successMessage,
          auth: otpResponse.auth,
        });
        return;
      }
    } catch (error: unknown) {
      console.error("Error updating profile:", getErrorMessage(error));
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
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ errorMessage: result.errorMessage });
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ errorMessage: "Internal server error" });
      }
    } catch (error: unknown) {
      console.error("Error in profileUpdateOtp:", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ errorMessage: "Internal server error" });
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

      res
        .status(HttpStatus.OK)
        .json({ message: "User logged out successfully" });
    } catch (error: unknown) {
      console.error("Logout error:", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  };

  getSingleServiceHandler = async (req: Request, res: Response) => {
    try {
      const id = getString(req.params.id);
      console.log(id);

      if (!id) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Service ID is required" });
        return;
      }

      const dto: GetSingleServiceRequestDTO = { serviceId: id };
      const data = await this.getServics.execute(dto);

      if (!data) {
        res.status(HttpStatus.NOT_FOUND).json({ message: "Service not found" });
        return;
      }

      res.status(HttpStatus.OK).json(data);
    } catch (error: unknown) {
      console.error("Error fetching service:", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  };

  public userProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      if (req.params.id) {
        const response = await this.getUserProfileUseCase.execute(getString(req.params.id));
        const user = response.user;
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

        const response = await this.getUserProfileUseCase.execute(decoded.userId);

        res.status(200).json({ user: response.user });
      }
    } catch (error: unknown) {
      console.error("Error in userProfile:", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  };

  public getActiveServices = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const page = Math.max(Number(req.query.page) || 1, 1);
      const limit = Math.min(Number(req.query.limit) || 10, 50);
      const skip = (page - 1) * limit;
      console.log(limit);
      console.log(skip);
      const dto: GetAllActiveServicesRequestDTO = { skip, limit };
      const result = await this.getAllActiveService.execute(dto);

      res.status(HttpStatus.OK).json(result);
      return;
    } catch (e: unknown) {
      console.error(getErrorMessage(e));
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "An error occurred while fetching services.",
      });
      return;
    }
  };

  public getActiveNearbyServices = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const userId = res.locals.user?.userId;

      const page = Math.max(Number(req.query.page) || 1, 1);
      const limit = Math.min(Number(req.query.limit) || 3);
      const skip = (page - 1) * limit;
      console.log(limit);
      console.log(skip);
      const longitude =
        req.query.longitude !== undefined ? Number(req.query.longitude) : null;

      const latitude =
        req.query.latitude !== undefined ? Number(req.query.latitude) : null;

      const parsedFilters = {
        category: req.query.category as string | undefined,

        experience: req.query.experience
          ? parseInt((req.query.experience as string).replace("+", ""), 10)
          : undefined,

        priceSort: req.query.priceSort as "gtToLow" | "lowTogt" | undefined,

        searchQuery: req.query.searchQuery as string | undefined,
      };

      console.log("Parsed Filters:", parsedFilters);
      console.log("Pagination:", { page, limit, skip });

      // if (isNaN(longitude) || isNaN(latitude)) {
      //   const result = await this.getAllActiveService.getNearByServices(
      //     userId,
      //     skip,
      //     limit,
      //     null,
      //     null,
      //     parsedFilters,
      //   );
      //   res.status(HttpStatus.OK).json(result);

      //   return;
      // }

      const dto: GetNearbyServicesRequestDTO = {
        userId,
        skip,
        limit,
        userLongitude: longitude,
        userLatitude: latitude,
        filters: parsedFilters
      };

      const result = await this.getAllActiveService.getNearByServices(dto);

      res.status(HttpStatus.OK).json(result);
      return;
    } catch (e: unknown) {
      console.error(getErrorMessage(e));
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "An error occurred while fetching services.",
      });
      return;
    }
  };

  //  public getActiveServices = async (
  //   req: Request,
  //   res: Response
  // ): Promise<void> => {
  //   try {
  //     const {
  //       userLongitude,
  //       userLatitude,
  //       category,
  //       experienceSort,
  //       priceSort,
  //       ratingFilter,
  //       searchQuery,
  //     } = req.query;

  //     const longitude = Number(userLongitude);
  //     const latitude = Number(userLatitude);
  //     const userId = res.locals.user?.userId;

  //     const filters = {
  //       category: category?.toString(),
  //       experienceSort: experienceSort?.toString(),
  //       priceSort: priceSort?.toString(),
  //       ratingFilter: ratingFilter ? Number(ratingFilter) : null,
  //       searchQuery: searchQuery?.toString(),
  //     };

  //     let result;
  //     console.log(req.query);

  //     console.log("____________________________________________");
  //     console.log("____________________________________________");
  //     console.log("____________________________________________");

  //     if (!isNaN(longitude) && !isNaN(latitude)) {
  //       result = await this.getAllActiveService.getNearByservices(
  //         longitude,
  //         latitude,
  //         userId,
  //         filters
  //       );
  //       console.log(result);

  //     } else {
  //       result = await this.getAllActiveService.execute(userId);
  //     }

  //     res.status(HttpStatus.OK).json(result);
  //     return;
  //   } catch (e) {
  //     console.error(e);
  //     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
  //       message: "An error occurred while fetching services.",
  //     });
  //     return;
  //   }
  // };

  public getAddress = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = res.locals.user?.userId;

      console.log("User ID:", userId);

      if (!userId) {
        res.status(401).json({ message: "Unauthorized: User ID missing" });
        return;
      }

      const dto: GetAddressRequestDTO = { userId };
      const allAddress = await this.getAddressUseCase.execute(dto);

      res.status(200).json({ allAddress });
      return;
    } catch (error: unknown) {
      console.error("Error fetching address:", getErrorMessage(error));
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

      const dto: AddAddressRequestDTO = { userId, address };
      const result = await this.addNewAddressUseCase.execute(dto);
      console.log(result);

      res.status(200).json({ message: "Address added successfully" });
      return;
    } catch (error: unknown) {
      console.error("Error adding new address:", getErrorMessage(error));
      res.status(500).json({ message: "Failed to add new address" });
      return;
    }
  };

  public editAddress = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("-9-0-0-0-0-0-0-0-0");
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

      const dto: EditAddressRequestDTO = { userId, address };
      await this.editAddressUseCase.execute(dto);

      res.status(200).json({ message: "Address updated successfully" });
      return;
    } catch (error: unknown) {
      console.error("Error updating address:", getErrorMessage(error));
      res.status(500).json({ message: "Failed to update address" });
      return;
    }
  };

  public deleteAddress = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = getString(req.params.id);
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

      const dto: DeleteAddressRequestDTO = { userId, addressId: id };
      await this.deleteAddressUseCase.execute(dto);

      res.status(200).json({ message: "Address deleted successfully" });
      return;
    } catch (error: unknown) {
      console.error("Error deleting address:", getErrorMessage(error));
      res.status(500).json({ message: "Failed to delete address" });
      return;
    }
  };

  public addReview = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log("Adding review with body:", req.body);
      const { bookedServiceId, serviceId, rating, comment, userId } = req.body;

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

      const reviewData: AddReviewRequestDTO = {
        bookedServiceId,
        serviceId,
        rating,
        comment,
        userId,
      };

      await this.addReviewUseCase.execute(reviewData);

      res
        .status(HttpStatus.CREATED)
        .json({ message: "Review added successfully!" });
    } catch (error: unknown) {
      console.error("Error adding review:", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Failed to add review." });
    }
  };

  public getServiceProviderInfoChat = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      if (getString(req.params.id)) {
        const dto: GetServiceProviderInfoRequestDTO = { userId: getString(req.params.id) };
        const user = await this.getServiceProviderInfoUseCase.execute(dto);
        res.status(HttpStatus.OK).json({
          userAvatar: user?.profileImage,
          userName: user?.serviceProviderName,
        });
        return;
      }
      res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: "Service provider ID is required" });
    } catch (error: unknown) {
      console.error("Error in getServiceProviderInfoChat:", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  };

  public getSiteThemes = async (req: Request, res: Response): Promise<void> => {
    try {
      const result: GetThemesResponseDTO = await this.userSiteSettings.getThemes();
      console.log(result.themes);
      res.status(HttpStatus.OK).json(result);
      return;
    } catch (error: unknown) {
      console.error("Error in getSiteThemes:", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  };

  public removeCoupon = async (req: Request, res: Response): Promise<void> => {
    try {
      const bookingId = getString(req.params.bookingId);
      const dto: RemoveCouponRequestDTO = { bookingId };

      const result = await this.removeCouponUseCase.execute(dto);
      
      if (result.success) {
        res.status(HttpStatus.OK).json(result);
      } else {
        res.status(HttpStatus.BAD_REQUEST).json(result);
      }
    } catch (err: unknown) {
      console.error("Error removing coupon:", getErrorMessage(err));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: "Failed to remove coupon" });
    }
  };

  public applyCoupon = async (req: Request, res: Response): Promise<void> => {
    try {
      const { couponCode, bookingId } = req.body;
      const dto: ApplyCouponRequestDTO = { couponCode, bookingId };

      const result = await this.applyCouponUseCase.execute(dto);

      if (result.success) {
        res.status(HttpStatus.OK).json(result);
      } else {
        res.status(HttpStatus.BAD_REQUEST).json(result);
      }
    } catch (error: unknown) {
      console.error("Error applying coupon:", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Failed to apply coupon" });
    }
  };
  public getSiteBanners = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const result: GetBannersResponseDTO = await this.userSiteSettings.getBanners();

      res.status(HttpStatus.OK).json(result);
      return;
    } catch (error: unknown) {
      console.error("Error in getSiteBanners:", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  };

  public findFeatureCoupons = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const skip = Number(req.query.skip) || 0;
      const dto: GetFeaturedCouponsRequestDTO = { skip };

      const data = await this.findFeatureCouponsUseCase.execute(dto);
      res.status(HttpStatus.OK).json(data);
    } catch (error: unknown) {
      console.error("Error fetching featured coupons:", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Something went wrong" });
    }
  };

  public findActiveCoupons = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const result: GetAllActiveCouponsResponseDTO = await this.findActiveCouponsusecase.execute();

      res.status(HttpStatus.OK).json({
        success: true,
        message: "Active coupons fetched successfully",
        data: result.coupons,
      });
      return;
    } catch (error: unknown) {
      console.error("Find active coupons error:", getErrorMessage(error));

      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to fetch active coupons",
      });
      return;
    }
  };

  public getRecommendedAds = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const dto: GetRecommendedAdsRequestDTO = {
        count: req.query.count ? Number(req.query.count) : 1,
        category: req.query.category as string | undefined,
        providerId: req.query.providerId as string | undefined,
        lat: req.query.lat ? Number(req.query.lat) : undefined,
        lng: req.query.lng ? Number(req.query.lng) : undefined,
        radius: req.query.radius ? Number(req.query.radius) : undefined,
      };
      const ads = await this.recommendAdsUseCase.execute(dto);

      res.status(HttpStatus.OK).json({
        success: true,
        count: ads.length,
        ads,
      });
    } catch (error: unknown) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: getErrorMessage(error) });
    }
  };

  public increaseClicks = async (req: Request, res: Response) => {
    try {
      const adId = getString(req.params.adId);
      const dto: IncreaseAdClicksRequestDTO = { adId };

      const result = await this.increaseAdClicksUseCase.execute(dto);

      res.status(200).json({
        success: true,
        message: "Clicks updated",
        clicks: result,
      });
    } catch (err: unknown) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: getErrorMessage(err) });
    }
  };

  public getAutoSuggestions = async (req: Request, res: Response) => {
    try {
      const { query } = req.query;
      if (!query || typeof query !== "string") {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Query parameter is required" });
        return;
      }

      const dto: GetAutoSuggestionRequestDTO = { query };
      const result = await this.autoSuggestionUseCase.execute(dto);

      res.status(HttpStatus.OK).json({ success: true, suggestions: result.suggestions });
    } catch (error: unknown) {
      console.error("Error fetching auto suggestions:", getErrorMessage(error));
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: getErrorMessage(error) || "Something went wrong" });
    }
  };
}
