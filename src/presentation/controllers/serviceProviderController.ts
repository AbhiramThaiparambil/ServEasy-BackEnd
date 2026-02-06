import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { GetPaymentInfoUseCaseServiceProvider } from "../../application/use-case/serviceProvider/GetPaymentInfoUseCaseServiceProvider";
import { HttpStatus } from "../../constants/HttpStatus";
import { RegisterServiceProviderUseCase } from "../../application/use-case/serviceProvider/auth/RegisterServiceProvider";
import { UpdateUserWithServiceProviderUseCase } from "../../application/use-case/serviceProvider/auth/UpdateUserWithServiceProvider";
import { IServiceProviderRegistration } from "../../domain/entities/IServiceProvider";
import { VerifyServiceProvider } from "../../application/use-case/serviceProvider/VerifyServiceProvider";
import { checkServiceProviderAvailabilityUseCase } from "../../application/use-case/serviceProvider/checkServiceProviderAvailabilityUseCase";
import { setAuthCookies } from "../../utils/setAuthCookies";
import { USE_CASE_TOKENS } from "../../constants/tokens";
import { IGetWalletUseCase } from "../../application/use-case/serviceProvider/wallet/getWallet/IGetWalletUseCase";
import { IWithdrawPaymentUseCase } from "../../application/use-case/serviceProvider/wallet/withdrawPayment/IWithdrawPaymentUseCase";

import { IGetServiceProviderRegistrationDetailsUseCase } from "../../application/use-case/serviceProvider/auth/getServiceProviderRegistrationDetails/IGetServiceProviderRegistrationDetailsUseCase";
import { IGetServiceProviderStatusUseCase } from "../../application/use-case/serviceProvider/wallet/getServiceProviderStatus/IGetServiceProviderStatusUseCase";
import { IReapplyServiceProviderUseCase } from "../../application/use-case/serviceProvider/auth/IReapplyServiceProviderUseCase";

import { IChangeAdStatusUseCase } from "../../application/use-case/common/ads/changeAdStatus/IChangeAdStatus.usecase";
import { ChangeAdStatusRequestDTO } from "../../application/dtos/common/ads/changeAdStatus/ChangeAdStatusDTO";
import { IGetNotificationUseCase } from "../../application/use-case/common/notification/getNotification/IGetNotification.usecase";
import { IMarkNotificationAsReadUseCase } from "../../application/use-case/common/notification/markNotificationAsRead/IMarkNotificationAsRead.usecase";
import { GetNotificationsRequestDTO } from "../../application/dtos/common/notification/getNotification/GetNotificationDTO";
import { MarkNotificationAsReadRequestDTO } from "../../application/dtos/common/notification/markNotificationAsRead/MarkNotificationAsReadDTO";
import { IGetCategory } from "../../application/use-case/common/category/getCategory/IGetCategory.usecase";
import { IEditAdUseCase } from "../../application/use-case/serviceProvider/ads/editAd/IEditAd.usecase";
import { GetCategoryRequestDTO } from "../../application/dtos/common/category/getCategory/GetCategoryDTO";
import { CreateAdRequestDTO } from "../../application/dtos/serviceProvider/ads/createAd/CreateAdRequestDTO";
import { EditAdRequestDTO } from "../../application/dtos/serviceProvider/ads/editAd/EditAdRequestDTO";
import { GetProviderAdsRequestDTO } from "../../application/dtos/serviceProvider/ads/getAd/GetProviderAdsRequestDTO";
import { CreateAiChatRequestDTO } from "../../application/dtos/serviceProvider/ai-assistance/create/CreateAiChatRequestDTO";
import { GetAIChatByIdRequestDTO } from "../../application/dtos/serviceProvider/ai-assistance/getById/GetAIChatByIdRequestDTO";
import { GetProviderAIChatsRequestDTO } from "../../application/dtos/serviceProvider/ai-assistance/getByServiceProvidersId/GetProviderAIChatsRequestDTO";
import { ICreateAdUseCase } from "../../application/use-case/serviceProvider/ads/createAd/ICreateAd.usecase";
import { IGetProviderAdsUseCase } from "../../application/use-case/serviceProvider/ads/getAd/IGetProviderAds.usecase";
import { ICreateAiChatUseCase } from "../../application/use-case/serviceProvider/ai-assistance/create/ICreateAiChat.usecase";
import { IGetAIChatByIdUseCase } from "../../application/use-case/serviceProvider/ai-assistance/getById/IGetAIChatByIdUseCase";
import { IGetProviderAIChatsUseCase } from "../../application/use-case/serviceProvider/ai-assistance/getByServiceProvidersId/IGetProviderAIChatsusecase";
import { GetServiceNamesRequestDTO } from "../../application/dtos/serviceProvider/service-management/getServiceNames/GetServiceNamesRequestDTO";
import { AddNewServiceRequestDTO } from "../../application/dtos/serviceProvider/service-management/addNewService/AddNewServiceRequestDTO";
import { BlockUnblockServiceRequestDTO } from "../../application/dtos/serviceProvider/service-management/blockUnblockService/BlockUnblockServiceRequestDTO";
import { EditServiceRequestDTO } from "../../application/dtos/serviceProvider/service-management/editService/EditServiceRequestDTO";
import { GetProviderServicesRequestDTO } from "../../application/dtos/serviceProvider/service-management/getServices/GetProviderServicesRequestDTO";
import { IAddNewServiceUseCase } from "../../application/use-case/serviceProvider/service-management/addNewService/IAddNewService.usecase";
import { IBlockUnblockServiceUseCase } from "../../application/use-case/serviceProvider/service-management/blockUnblockService/IBlockUnblockService.usecase";
import { IEditServiceUseCase } from "../../application/use-case/serviceProvider/service-management/editService/IEditService.usecase";
import { IGetServicesUseCase } from "../../application/use-case/serviceProvider/service-management/getServices/IGetServices.usecase";
import { IGetServiceNamesUseCase } from "../../application/use-case/serviceProvider/service-management/getServiceNames/IGetServiceNames.usecase";
import { IManageAllServiceUseCase } from "../../application/use-case/admin/dashboard/IManageAllService.usecase";
import { IGetSubscriptionPlansUseCase } from "../../application/use-case/serviceProvider/subscription/getSubscriptionPlans/IGetSubscriptionPlansUseCase";
import { IEditServiceProviderProfileUseCase } from "../../application/use-case/serviceProvider/profile/editProfile/IEditProfile";
import { IGetServiceProvider } from "../../application/use-case/serviceProvider/profile/getProfile/IGetServiceProvider";
import { GetServiceProvider } from "../../application/use-case/serviceProvider/profile/getProfile/GetServiceProvider";
import { GetProfileRequestDTO } from "../../application/dtos/serviceProvider/profile/getProfile/GetProfileRequestDTO";
import { EditProfileRequestDTO } from "../../application/dtos/serviceProvider/profile/editProfile/EditProfileRequestDTO";

@injectable()
export class ServiceProviderController {
  constructor(
    @inject(GetPaymentInfoUseCaseServiceProvider)
    private getPaymentInfo: GetPaymentInfoUseCaseServiceProvider,
    @inject(GetServiceProvider)
    private getServiceProviderUseCase: IGetServiceProvider,
    @inject(USE_CASE_TOKENS.EditServiceProviderProfileUseCase)
    private editServiceProviderProfileUseCase: IEditServiceProviderProfileUseCase,
    @inject(RegisterServiceProviderUseCase)
    private registerServiceProviderUseCase: RegisterServiceProviderUseCase,
    @inject(UpdateUserWithServiceProviderUseCase)
    private updateUserWithServiceProviderUseCase: UpdateUserWithServiceProviderUseCase,

    @inject(VerifyServiceProvider)
    private verifyServiceProviderUseCase: VerifyServiceProvider,
    @inject(USE_CASE_TOKENS.GetCategory)
    private getCategoryUseCase: IGetCategory,

    @inject(USE_CASE_TOKENS.ManageAllServiceUseCase)
    private manageAllServiceUseCase: IManageAllServiceUseCase,
    @inject(checkServiceProviderAvailabilityUseCase)
    private checkServiceProviderAvailabilityUseCase: checkServiceProviderAvailabilityUseCase,
    @inject(USE_CASE_TOKENS.GetWalletUseCase)
    private getWalletUseCase: IGetWalletUseCase,
    @inject(USE_CASE_TOKENS.WithdrawPaymentUseCase)
    private withdrawPaymentUseCase: IWithdrawPaymentUseCase,
    @inject(USE_CASE_TOKENS.GetSubscriptionPlansUseCase)
    private getSubscriptionPlansUseCase: IGetSubscriptionPlansUseCase,
    @inject(USE_CASE_TOKENS.EditAdUseCase)
    private editAdUseCase: IEditAdUseCase,
    @inject(USE_CASE_TOKENS.CreateAdUseCase)
    private createAdUseCase: ICreateAdUseCase,
    @inject(USE_CASE_TOKENS.GetProviderAdsUseCase)
    private getProviderAdsUseCase: IGetProviderAdsUseCase,
    @inject(USE_CASE_TOKENS.GetServiceNamesUseCase)
    private getServiceNamesUseCase: IGetServiceNamesUseCase,
    @inject(USE_CASE_TOKENS.ChangeAdStatusUseCase)
    private changeAdStatusUseCase: IChangeAdStatusUseCase,
    // @inject(NotificationUseCase)
    // private notificationUseCase: NotificationUseCase,
    @inject(USE_CASE_TOKENS.GetServiceProviderRegistrationDetailsUseCase)
    private getRegistrationDetailsUseCase: IGetServiceProviderRegistrationDetailsUseCase,
    @inject(USE_CASE_TOKENS.GetServiceProviderStatusUseCase)
    private getServiceProviderStatusUseCase: IGetServiceProviderStatusUseCase,
    @inject(USE_CASE_TOKENS.ReapplyServiceProviderUseCase)
    private reapplyServiceProviderUseCase: IReapplyServiceProviderUseCase,
    @inject(USE_CASE_TOKENS.GetNotificationUseCase)
    private getNotificationUsecase: IGetNotificationUseCase,
    @inject(USE_CASE_TOKENS.MarkNotificationAsReadUseCase)
    private markAsRead: IMarkNotificationAsReadUseCase,
    @inject(USE_CASE_TOKENS.CreateAiChatUseCase)
    private createAiChatUseCase: ICreateAiChatUseCase,
    @inject(USE_CASE_TOKENS.GetAIChatByIdUseCase)
    private getAIChatByIdUseCase: IGetAIChatByIdUseCase,
    @inject(USE_CASE_TOKENS.GetProviderAIChatsUseCase)
    private getProviderAIChatsUseCase: IGetProviderAIChatsUseCase,
    @inject(USE_CASE_TOKENS.AddNewService)
    private addNewServiceUseCase: IAddNewServiceUseCase,
    @inject(USE_CASE_TOKENS.BlockUnblockSericeUseCase)
    private blockUnblockServiceUseCase: IBlockUnblockServiceUseCase,
    @inject(USE_CASE_TOKENS.EditService)
    private editServiceUseCase: IEditServiceUseCase,
    @inject(USE_CASE_TOKENS.GetService)
    private getServicesUseCase: IGetServicesUseCase,
  ) {}

  async getRegistrationDetails(req: Request, res: Response): Promise<void> {
    try {
      const userId = res.locals.user?.userId;

      if (!userId) {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: "Unauthorized" });
        return;
      }

      const provider = await this.getRegistrationDetailsUseCase.execute(userId);
      console.log(provider);
      if (provider) {
        res.status(200).json(provider);
        return;
      } else {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: "No service provider registration found" });
        return;
      }
    } catch (error: any) {
      res.status(404).json({
        message: error.message || "Unable to fetch registration details",
      });
      return;
    }
  }

  async getStatus(req: Request, res: Response): Promise<void> {
    try {
      console.log("status called ");
      const userId = res.locals.user?.userId;

      if (!userId) {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: "Unauthorized" });
        return;
      }

      const result = await this.getServiceProviderStatusUseCase.execute(userId);

      res.status(HttpStatus.OK).json(result);
      return;
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Unable to fetch service provider status",
      });
      return;
    }
  }

  async getNotification(req: Request, res: Response): Promise<void> {
    try {
      const serviceProviderId = res.locals.serviceProvider_id;
      if (!serviceProviderId) {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: "User not found" });
        return;
      }

      const dto: GetNotificationsRequestDTO = { userId: serviceProviderId };
      const notification =
        await this.getNotificationUsecase.execute(dto);
      res.status(HttpStatus.OK).json(notification);
    } catch (error) {
      console.error(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }

  markAsReadNotification = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const { id } = req.params;
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
    } catch (error) {
      console.error(error);
      console.log(error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  };

  async getPaymentInfoForChartServiceProvider(
    req: Request,
    res: Response,
  ): Promise<void> {
    console.log("getPaymentInfo is:", this.getPaymentInfo);

    try {
      const startDate = req.query.startDate
        ? new Date(req.query.startDate as string)
        : undefined;
      const endDate = req.query.endDate
        ? new Date(req.query.endDate as string)
        : undefined;
      const serviceProviderId = res.locals.serviceProvider_id;
      console.log("getPaymentInfo is:", this.getPaymentInfo);
      const paymentData = await this.getPaymentInfo.execute(
        serviceProviderId,
        startDate,
        endDate,
      );

      res.status(HttpStatus.OK).json({ paymentData });
      return;
    } catch (error) {
      console.error("Failed to fetch payment info for chart:", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
      return;
    }
  }

  async handleChat(req: Request, res: Response): Promise<void> {
    try {
      const serviceProviderId = res.locals.serviceProvider_id;
      const { prompt, activeChatId } = req.body;

      const dto: CreateAiChatRequestDTO = {
        serviceProviderId,
        prompt,
        activeChatId,
      };

      const result = await this.createAiChatUseCase.execute(dto);

      res.status(HttpStatus.OK).json({ success: true, data: result });
    } catch (error) {
      console.error("Error in AI Assistance Controller:", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: "Internal server error" });
    }
  }

  async getChatHistory(req: Request, res: Response): Promise<void> {
    try {
      const { chatId } = req.params;
      const dto: GetAIChatByIdRequestDTO = { id: chatId };
      const chat = await this.getAIChatByIdUseCase.execute(dto);

      if (!chat) {
        res
          .status(HttpStatus.NOT_FOUND)
          .json({ success: false, message: "Chat not found" });
        return;
      }

      res.status(HttpStatus.OK).json({ success: true, data: chat });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: "Internal server error" });
    }
  }

  async getProviderChats(req: Request, res: Response): Promise<void> {
    try {
      const providerId = res.locals.serviceProvider_id;
      const dto: GetProviderAIChatsRequestDTO = { providerId };
      const chats = await this.getProviderAIChatsUseCase.execute(dto);

      res.status(HttpStatus.OK).json({ success: true, data: chats });
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: "Internal server error" });
    }
  }

  async createAd(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateAdRequestDTO = req.body;
      const createdAd = await this.createAdUseCase.execute(data);

      if (createdAd) {
        res.status(HttpStatus.OK).json({
          message:
            "Ad creation request submitted successfully. Waiting for admin approval.",
          adObject: createdAd,
        });
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Failed to create ad." });
      }
    } catch (error) {
      console.error("Error creating ad:", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error." });
    }
  }

  async updateServiceProvider(req: Request, res: Response): Promise<void> {
    try {
      const serviceProviderId = res.locals.serviceProvider_id;
      
      if (!serviceProviderId) {
        res.status(HttpStatus.UNAUTHORIZED).json({ message: "Unauthorized" });
        return;
      }

      const dto: EditProfileRequestDTO = {
        serviceProviderId,
        ...req.body
      };

      const updated = await this.editServiceProviderProfileUseCase.execute(dto);

      if (updated) {
        res
          .status(HttpStatus.OK)
          .json({ message: "Service provider updated successfully" });
      } else {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: "Failed to update service provider" });
      }
    } catch (error) {
      console.error("Error updating service provider:", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal Server Error" });
    }
  }

  async editAd(req: Request, res: Response): Promise<void> {
    try {
      const { adId } = req.params;
      const updateData = req.body;
      const dto: EditAdRequestDTO = { adId, updateData };
      const updatedAd = await this.editAdUseCase.execute(dto);

      if (updatedAd) {
        res
          .status(HttpStatus.OK)
          .json({ message: "Ad updated successfully.", adObject: updatedAd });
      } else {
        res.status(HttpStatus.NOT_FOUND).json({ message: "Ad not found." });
      }
    } catch (error) {
      console.error("Error editing ad:", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error." });
    }
  }

  async registerServiceProvider(req: Request, res: Response): Promise<void> {
    try {
      const { data, bankDetails } = req.body;

      const {
        serviceProviderName,
        serviceProviderEmail,
        serviceProviderPhone,
        businessType,
        category,
        subcategory,
        experience,
        location,
        serviceMode,
        services,
        skills,
        profileImage,
        documentImg,
        documentImg2,
        socialMedia,
        description,
      } = data;

      const serviceProviderData: IServiceProviderRegistration = {
        serviceProviderName,
        serviceProviderEmail,
        serviceProviderPhone,
        experience: parseInt(experience, 10),
        location,
        services,
        skills,
        serviceMode,
        profileImage: "",
        document: [],
        businessType,
        category,
        subcategory,
        socialMedia: socialMedia + "",
        description: description || "",
        userId: res.locals.user.userId,
        bankDetails,
      };

      const serviceProvider = await this.registerServiceProviderUseCase.execute(
        serviceProviderData,
        profileImage,
        documentImg,
        documentImg2,
      );

      const user = res.locals.user;

      if (user.userId && serviceProvider._id) {
        await this.updateUserWithServiceProviderUseCase.execute(
          user.userId,
          serviceProvider._id.toString(),
        );
      }

      res.status(HttpStatus.CREATED).json({
        message: "Service provider registered successfully.",
        serviceProvider,
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "An error occurred while registering the service provider.",
      });
    }
  }

  async reapplyServiceProvider(req: Request, res: Response): Promise<void> {
    try {
      const { data, bankDetails } = req.body;

      const {
        serviceProviderName,
        serviceProviderEmail,
        serviceProviderPhone,
        businessType,
        category,
        subcategory,
        experience,
        location,
        serviceMode,
        services,
        skills,
        profileImage,
        documentImg,
        documentImg2,
        socialMedia,
        description,
      } = data;

      const serviceProviderData: IServiceProviderRegistration = {
        serviceProviderName,
        serviceProviderEmail,
        serviceProviderPhone,
        experience: parseInt(experience, 10),
        location,
        services,
        skills,
        serviceMode,
        profileImage: "",
        document: [],
        businessType,
        category,
        subcategory,
        socialMedia: socialMedia + "",
        description: description || "",
        userId: res.locals.user.userId,
        bankDetails,
      };

      const serviceProvider = await this.reapplyServiceProviderUseCase.execute(
        serviceProviderData,
        profileImage,
        documentImg,
        documentImg2,
      );

      res.status(HttpStatus.OK).json({
        message: "Service provider reapplied successfully.",
        serviceProvider,
      });
    } catch (error) {
      console.error("Reapply error:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "An error occurred while reapplying as a service provider.",
      });
    }
  }

  async verifyServiceProvider(req: Request, res: Response): Promise<void> {
    try {
      const user = res.locals.user;

      if (!user || !user.userId) {
        res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ message: "Unauthorized access" });
        return;
      }

      const refreshToken = await this.verifyServiceProviderUseCase.execute(
        user.userId,
      );

      if (!refreshToken) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Not a valid service provider" });
        return;
      }

      setAuthCookies(res, "serviceProviderToken", refreshToken);
      res.status(HttpStatus.OK).json({ message: "Service provider verified" });
    } catch (error) {
      console.error("Error verifying service provider:", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }

  async getActiveCategories(req: Request, res: Response): Promise<void> {
    try {
      const dto: GetCategoryRequestDTO = {};
      const categories = await this.getCategoryUseCase.execute(dto);
      res.status(HttpStatus.OK).json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error." });
    }
  }

  async getServiceProvider(req: Request, res: Response): Promise<void> {
    try {
      const user = res.locals.user;

      const dto: GetProfileRequestDTO = { userId: user.userId };
      const result = await this.getServiceProviderUseCase.execute(dto);

      res.status(HttpStatus.OK).json({ serviceProvider: result });
    } catch (error) {
      console.error("Error fetching service provider:", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error." });
    }
  }

  async makeItactiveAllService(req: Request, res: Response) {
    try {
      const serviceProviderId = req.params.id;

      if (!serviceProviderId) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: "Service provider ID is required",
        });
        return;
      }

      await this.manageAllServiceUseCase.makeActiveAllService(
        serviceProviderId,
      );

      res.status(HttpStatus.OK).json({
        message: "All services have been activated successfully.",
      });
      return;
    } catch (error) {
      console.error("Error activating services:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong while activating services.",
        error,
      });
      return;
    }
  }

  async makeInactiveAllService(req: Request, res: Response) {
    try {
      const serviceProviderId = req.params.id;

      if (!serviceProviderId) {
        res.status(HttpStatus.BAD_REQUEST).json({
          message: "Service provider ID is required",
        });
        return;
      }

      await this.manageAllServiceUseCase.makeActiveAllService(
        serviceProviderId,
      );

      res.status(HttpStatus.OK).json({
        message: "All services have been marked as inactive successfully.",
      });
      return;
    } catch (error) {
      console.error("Error deactivating services:", error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "Something went wrong while deactivating services.",
        error,
      });
      return;
    }
  }

  // async rescheduleBookingHandler(req: Request, res: Response){
  //   try{
  //     const { bookingId, newDate } = req.body;

  //     if (!bookingId || !newDate ) {
  //       return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Booking ID, new date, and new time are required.' });
  //     }

  //     const updatedBooking = await this.manageAllServiceUseCase.rescheduleBooking(bookingId, newDate);

  //     if (!updatedBooking) {
  //       return res.status(HttpStatus.NOT_FOUND).json({ message: 'Booking not found or could not be rescheduled.' });
  //     }

  //     res.status(HttpStatus.OK).json({ message: 'Booking rescheduled successfully.', booking: updatedBooking });

  //   } catch (error) {
  //     console.error('Error rescheduling booking:', error);
  //     res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });

  // }
  // }

  async getAvailability(req: Request, res: Response): Promise<void> {
    try {
      const serviceProviderId = req.params.serviceProviderId;

      if (!serviceProviderId) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Service provider ID is required" });
        return;
      }

      const availability =
        await this.checkServiceProviderAvailabilityUseCase.execute(
          serviceProviderId,
        );

      res.status(HttpStatus.OK).json({ availability });
    } catch (error) {
      console.error("Error fetching availability:", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error" });
    }
  }

  async getWallet(req: Request, res: Response) {
    try {
      const serviceProviderId = res.locals.serviceProvider_id;
      console.log(req.query);
      const limit = parseInt(req.query.limit as string) || 10;
      const page = parseInt(req.query.skip as string) || 0;
      const skip = page * limit;

      const data = await this.getWalletUseCase.execute(
        serviceProviderId,
        limit,
        skip,
      );
      if (!data) {
        res.status(HttpStatus.BAD_REQUEST);
      }
      res
        .status(HttpStatus.OK)
        .json({ success: true, data: data?.wallet, count: data?.count });
    } catch (error: any) {
      res
        .status(HttpStatus.OK)
        .json({ success: false, message: error.message });
    }
  }

  withdrawPayment = async (req: Request, res: Response): Promise<void> => {
    try {
      const serviceProviderId = res.locals.serviceProvider_id;
      const { amount } = req.body;

      if (!amount || !serviceProviderId) {
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Amount and Service Provider ID are required" });
        return;
      }
      const result = await this.withdrawPaymentUseCase.execute(
        serviceProviderId,
        amount,
      );

      res.status(HttpStatus.OK).json({ success: true, data: result });
    } catch (error: any) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: error.message });
    }
  };

  async getAvailableSubscriptionPlans(
    req: Request,
    res: Response,
  ): Promise<void> {
    try {
      const plans = await this.getSubscriptionPlansUseCase.execute();
      res.status(HttpStatus.OK).json(plans);
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Error fetching subscription plans", error });
    }
  }


  async getProviderAds(req: Request, res: Response): Promise<void> {
    try {
      const { providerId } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;
      const skip = (page - 1) * limit;

      const dto: GetProviderAdsRequestDTO = { providerId, skip, limit };
      const { ads, count } = await this.getProviderAdsUseCase.execute(dto);

      res.status(HttpStatus.OK).json({
        ads,
        total: count,
        page,
        totalPages: Math.ceil(count / limit),
      });
    } catch (error) {
      console.error("Error fetching ads:", error);
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: "Internal server error." });
    }
  }

  async changeAdStatus(req: Request, res: Response): Promise<void> {
    try {
      const { adId } = req.params;
      const { status } = req.body;
      if (!adId || !status) {
        res.status(400).json({ message: "adId and status are required" });
        return;
      }

      const dto: ChangeAdStatusRequestDTO = { adId, status };
      const updated = await this.changeAdStatusUseCase.execute(dto);

      if (!updated) {
        res.status(404).json({ message: "Ad not found or status unchanged" });
        return;
      }

      res.status(200).json({
        message: "Ad status updated successfully",
        status,
      });
    } catch (error) {
      console.error("Error changing ad status:", error);

      res.status(500).json({
        message: "Internal server error",
        error: error instanceof Error ? error.message : error,
      });
    }
  }

  async getServiceNames(req: Request, res: Response): Promise<void> {
    try {
      const { providerId } = req.params;
      const dto: GetServiceNamesRequestDTO = { providerId };
      const result = await this.getServiceNamesUseCase.execute(dto);
      console.log(result);
      res.status(200).json({
        success: true,
        data: result,
      });

      return;
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Something went wrong",
      });

      return;
    }
  }

  async addNewService(req: Request, res: Response): Promise<void> {
    try {
      const dto: AddNewServiceRequestDTO = req.body;
      const result = await this.addNewServiceUseCase.execute(dto);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Something went wrong",
      });
    }
  }

  async blockService(req: Request, res: Response): Promise<void> {
    try {
      const { serviceId } = req.body;
      const dto: BlockUnblockServiceRequestDTO = { serviceId };
      const result = await this.blockUnblockServiceUseCase.blockService(dto);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Something went wrong",
      });
    }
  }

  async unblockService(req: Request, res: Response): Promise<void> {
    try {
      const { serviceId } = req.body;
      const dto: BlockUnblockServiceRequestDTO = { serviceId };
      const result = await this.blockUnblockServiceUseCase.unblockService(dto);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Something went wrong",
      });
    }
  }

  async editService(req: Request, res: Response): Promise<void> {
    try {
      const dto: EditServiceRequestDTO = req.body;
      const result = await this.editServiceUseCase.execute(dto);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Something went wrong",
      });
    }
  }

  async getServices(req: Request, res: Response): Promise<void> {
    try {
      const { providerId } = req.params;
      const dto: GetProviderServicesRequestDTO = { providerId };
      const result = await this.getServicesUseCase.execute(dto);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : "Something went wrong",
      });
    }
  }
}
