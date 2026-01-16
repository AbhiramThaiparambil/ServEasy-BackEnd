import "reflect-metadata";
import { MongoUserRepository } from "./infrastructure/repositories/UserRepositoriey";
import { ServiceProviderRepository } from "./infrastructure/repositories/ServiceProviderRepository";
import { IServiceProviderRepository } from "./domain/repositories/IserviceProviderRepository";
import { ICategoryRepository } from "./domain/repositories/IcategoryRepository";
import { IUserRepository } from "./domain/repositories/IuserRepository";
import { container } from "tsyringe";
import { EmailService } from "./services/mailService/MailService";
import { Otpservice } from "./services/otp/OtpService";
import { RegisterUser } from "./application/use-case/User/auth/RegisterUser";
import { RedisService } from "./services/redis/RedisService";
import { SmsOtpService } from "./services/otp/SmsOtpService";
import { ResendOtp } from "./application/use-case/User/auth/ResendOtp";
import { TokenService } from "./services/token/TokenService";
import { CloudinaryService } from "./services/cloudinary/CloudinaryService";
import { RegisterServiceProviderUseCase } from "./application/use-case/serviceProvider/auth/RegisterServiceProvider";
import { LocationService } from "./services/location/location";
import { ServiceRepository } from "./infrastructure/repositories/ServiceRepositorie";
import { CategoryRepository } from "./infrastructure/repositories/categoryRepository";
import { ServiceBookingRepository } from "./infrastructure/repositories/ServiceBookingRepository";
import { RazorpayService } from "./services/payment/RazorpayService";
import { ChatRepository } from "./infrastructure/repositories/ChatRepository";
import { IChatRepository } from "./domain/repositories/IChatRepository";
import { ReviewRepository } from "./infrastructure/repositories/ReviewRepository";
import { VerifyOtp } from "./application/use-case/User/auth/VerifyOtp";
import { NotificationRepository } from "./infrastructure/repositories/NotificationRepository";
import { SiteSettingRepository } from "./infrastructure/repositories/SiteSettingRepository";
import { ISlotRepository } from "./domain/repositories/ISlotRepository";
import { SlotRepository } from "./infrastructure/repositories/SlotRepository";
import { SocketService } from "./services/socket/SocketService";
import { ProviderWalletRepository } from "./infrastructure/repositories/providerWalletRepository";
import { IProviderWalletRepository } from "./domain/repositories/IproviderWalletRepository";
import { ICouponRepository } from "./domain/repositories/IcouponRepository";
import { CouponRepository } from "./infrastructure/repositories/couponRepository";
import { ICreateCouponUseCase } from "./application/use-case/coupon/createCoupon/ICreateCoupon.usecase";
import { IFindAllCouponsUseCase } from "./application/use-case/coupon/findAllCoupons/IFindAllCoupons.usecase";
import { CreateCouponUseCase } from "./application/use-case/coupon/createCoupon/CreateCoupon.usecase";
import { FindAllCouponsUseCase } from "./application/use-case/coupon/findAllCoupons/FindAllCoupons.usecase";
import {
  REPOSITORY_TOKENS,
  SERVICE_TOKENS,
  USE_CASE_TOKENS,
} from "./constants/tokens";
import { MakeCouponInactiveUseCase } from "./application/use-case/coupon/makeCouponInactive/MakeCouponInactive.usecase";
import { IMakeCouponInactiveUseCase } from "./application/use-case/coupon/makeCouponInactive/IMakeCouponInactive.usecase";
import { IToggleShowInBannerUseCase } from "./application/use-case/coupon/toggleShowInBanner/IToggleShowInBanner.usecase";
import { ToggleShowInBannerUseCase } from "./application/use-case/coupon/toggleShowInBanner/ToggleShowInBanner.usecase";
import { IFindFeaturedCouponsUseCase } from "./application/use-case/coupon/FeaturedCoupons/IFindFeaturedCoupons.usecase";
import { FindFeaturedCouponsUseCase } from "./application/use-case/coupon/FeaturedCoupons/FindFeaturedCoupons.usecase";
import { ApplyCouponToBookingUseCase } from "./application/use-case/coupon/applyCoupon/ApplyCouponToBooking.usecase";
import { IApplyCouponToBookingUseCase } from "./application/use-case/coupon/applyCoupon/IApplyCouponToBooking.usecase";
import { IRemoveCouponToBookingUseCase } from "./application/use-case/coupon/removeCoupon/IRemoveCoupon.usecase";
import { RemoveCouponToBookingUseCase } from "./application/use-case/coupon/removeCoupon/RemoveCoupon.usecase";
import { GetWalletUseCase } from "./application/use-case/serviceProvider/wallet/getWallet/GetWalletUseCase";
import { IGetWalletUseCase } from "./application/use-case/serviceProvider/wallet/getWallet/IGetWalletUseCase";
import { IWithdrawPaymentUseCase } from "./application/use-case/serviceProvider/wallet/withdrawPayment/IWithdrawPaymentUseCase";
import { WithdrawPaymentUseCase } from "./application/use-case/serviceProvider/wallet/withdrawPayment/WithdrawPaymentUseCase";
import { IGetAllProvidersWalletsUseCase } from "./application/use-case/admin/wallet/getWallet/IGetAllProvidersWallets.usecase";
import { GetAllProvidersWallets } from "./application/use-case/admin/wallet/getWallet/GetAllProvidersWallets.usecase";
import { IGetProviderWalletUseCase } from "./application/use-case/admin/wallet/getWalletByid/IGetProviderWalletById.usecase";
import { WithdrawFromProviderWalletUseCase } from "./application/use-case/admin/wallet/withdraw/WithdrawFromProviderWallet.usecase";
import { ISubscriptionPlanRepository } from "./domain/repositories/ISubscriptionPlanRepository";
import { SubscriptionPlanRepository } from "./infrastructure/repositories/SubscriptionPlanRepository";
import { IGetSubscriptionPlansUseCase } from "./application/use-case/subscription/IGetSubscriptionPlansUseCase";
import { GetSubscriptionPlansUseCase } from "./application/use-case/subscription/GetSubscriptionPlansUseCase";
import { ICreatePaymentSubscriptionOrderUseCase } from "./application/use-case/subscription/payment/ICreatePaymentSubscriptionOrderUseCase";
import { CreatePaymentSubscriptionOrderUseCase } from "./application/use-case/subscription/payment/CreatePaymentSubscriptionOrderUseCase";
import { IVerifySubscriptionPaymentUseCase } from "./application/use-case/subscription/payment/IVerifySubscriptionPaymentUseCase";
import { VerifySubscriptionPaymentUseCase } from "./application/use-case/subscription/payment/VerifySubscriptionPaymentUseCase";
import { GoogleGenAIService } from "./services/aiAssistant/GoogleGenAIService";
import { IGoogleGenAIService } from "./services/aiAssistant/IGoogleGenAIService";
import { IAiAssistanceRepository } from "./domain/repositories/IAiAssistanceRepository";
import { aiAssistanceRepository } from "./infrastructure/repositories/AiAssistanceRepository";
import { ICreateAiChatUseCase } from "./application/use-case/premiumFeatures/aiAssistance/create/ICreateAiChat.usecase";
import { CreateAiChatUseCase } from "./application/use-case/premiumFeatures/aiAssistance/create/CreateAiChat.usecase";
import { IGetAIChatByIdUseCase } from "./application/use-case/premiumFeatures/aiAssistance/getById/IGetAIChatByIdUseCase";
import { GetAIChatByIdUseCase } from "./application/use-case/premiumFeatures/aiAssistance/getById/GetAIChatByIdUseCase";
import { IGetProviderAIChatsUseCase } from "./application/use-case/premiumFeatures/aiAssistance/getByServiceProvidersId/IGetProviderAIChatsusecase";
import { GetProviderAIChatsUseCase } from "./application/use-case/premiumFeatures/aiAssistance/getByServiceProvidersId/GetProviderAIChats.usecase";
import { ManageServiceProviderSubscriptionsUseCase } from "./application/use-case/subscription/ManageServiceProviderSubscriptionsUseCase";
import { IManageServiceProviderSubscriptionsUseCase } from "./application/use-case/subscription/IManageServiceProviderSubscriptionsUseCase";
import { connect } from "http2";
import { GetAllSubscriptionPlansUseCase } from "./application/use-case/admin/subscriptionManagement/getSubscription/GetAllSubscriptionPlans.usecase";
import { ICreateSubscriptionPlanUseCase } from "./application/use-case/admin/subscriptionManagement/createSubscription/ICreateSubscriptionPlan.usecase";
import { CreateSubscriptionPlanUseCase } from "./application/use-case/admin/subscriptionManagement/createSubscription/CreateSubscriptionPlan.usecase";
import { IUpdateSubscriptionPlanUseCase } from "./application/use-case/admin/subscriptionManagement/updateSubscription/IUpdateSubscriptionPlan.usecase";
import { UpdateSubscriptionPlanUseCase } from "./application/use-case/admin/subscriptionManagement/updateSubscription/UpdateSubscriptionPlan.usecase";
import { AdRepository } from "./infrastructure/repositories/AdRepository";

import { IGetProviderAdsUseCase } from "./application/use-case/ads-useCase/getAd/IGetProviderAds.usecase";
import { GetProviderAdsUseCase } from "./application/use-case/ads-useCase/getAd/GetProviderAds.usecase";
import { IServiceRepository } from "./domain/repositories/IServiceRepository";
import { IGetServiceNamesUseCase } from "./application/use-case/admin/service-management/getServiceNames/IGetServiceNames.usecase";
import { GetServiceNamesUseCase } from "./application/use-case/admin/service-management/getServiceNames/GetServiceNames.usecases";
import { IAdminGetAdsUseCase } from "./application/use-case/admin/ads/getAds/IAdminGetAds.usecase";

import { IRecommendAdsUseCase } from "./application/use-case/User/Ads/IRecommendAdsUseCase";
import { RecommendAdsUseCase } from "./application/use-case/User/Ads/RecommendAdsUseCase";
import { IExpireAdsUseCase } from "./application/use-case/admin/ads/expireAds/ExpireAds.usecase";
import { IIncreaseAdClicksUseCase } from "./application/use-case/User/Ads/IIncreaseAdClicksUseCase";
import { IncreaseAdClicksUseCase } from "./application/use-case/User/Ads/IncreaseAdClicksUseCase";
import { IUpdateBookingStatusUseCase } from "./application/use-case/booking/updateBookingStatus/IUpdateBookingStatusUseCase";
import { UpdateBookingStatusUseCase } from "./application/use-case/booking/updateBookingStatus/UpdateBookingStatusUseCase";
import { IConfirmBookingUseCase } from "./application/use-case/booking/confirmBooking/IConfirmBooking.usecase";
import { ConfirmBookingUseCase } from "./application/use-case/booking/confirmBooking/ConfirmBooking.usecase";
import { ICancelBookingUseCase } from "./application/use-case/booking/cancelBooking/ICancelBooking.usecase";
import { CancelBookingUseCase } from "./application/use-case/booking/cancelBooking/CancelBooking.usecase";
import { IRequestPaymentUseCase } from "./application/use-case/booking/requestPayment/IRequestPaymentUseCase";
import { RequestPaymentUseCase } from "./application/use-case/booking/requestPayment/RequestPaymentUseCase";
import { ICreateOnlineBookingUseCase } from "./application/use-case/booking/createOnlineBooking/ICreateOnlineBooking.usecase";
import { CreateOnlineBookingUseCase } from "./application/use-case/booking/createOnlineBooking/CreateOnlineBooking.usecase";
import { CreateBookingUseCase } from "./application/use-case/booking/createBooking/CreateBooking.usecase";
import { ICreateBookingUseCase } from "./application/use-case/booking/createBooking/ICreateBooking.usecase";
import { GetBookedServicesUseCase } from "./application/use-case/booking/fetchByid/GetBookedServices.usecase";
import { IGetBookedServicesUseCase } from "./application/use-case/booking/fetchBookings/IGetBookedServicesUseCase";
import { IGetBookedServiceByIdUseCase } from "./application/use-case/booking/fetchBookings/IGetBookedServiceByIdUseCase";
import { GetBookedServiceByIdUseCase } from "./application/use-case/booking/fetchByid/GetBookedServiceById.usecase";

import { IServiceBookingRepository } from "./domain/repositories/IserviceBookingRepository";
import { RescheduleOnlineServiceSlotUseCase } from "./application/use-case/booking/rescheduleOnlineService/RescheduleOnlineService.usecase";
import { IRescheduleOnlineServiceSlotUseCase } from "./application/use-case/booking/rescheduleOnlineService/IRescheduleOnlineService.usecase";
import { IGetServiceProviderRegistrationDetailsUseCase } from "./application/use-case/serviceProvider/auth/getServiceProviderRegistrationDetails/IGetServiceProviderRegistrationDetailsUseCase";
import { GetServiceProviderRegistrationDetailsUseCase } from "./application/use-case/serviceProvider/auth/getServiceProviderRegistrationDetails/GetServiceProviderRegistrationDetailsUseCase";
import { IGetServiceProviderStatusUseCase } from "./application/use-case/serviceProvider/providerWallet/getServiceProviderStatus/IGetServiceProviderStatusUseCase";
import { GetServiceProviderStatusUseCase } from "./application/use-case/serviceProvider/providerWallet/getServiceProviderStatus/GetServiceProviderStatusUseCase";
import { ReapplyServiceProviderUseCase } from "./application/use-case/serviceProvider/auth/ReapplyServiceProviderUseCase";
import { IReapplyServiceProviderUseCase } from "./application/use-case/serviceProvider/auth/IReapplyServiceProviderUseCase";
import { ITokenService } from "./services/token/ITokenService";
import { IRedisService } from "./services/redis/IRedisService";
import { ICloudinaryService } from "./services/cloudinary/ICloudinaryService";
import { ISmsOtpService } from "./services/otp/ISmsOtpService";
import { IOtpService } from "./services/otp/IOtpService";
import { IEmailService } from "./services/mailService/IEmailService";
import { ICleanupSlotsBeforeTodayUseCase } from "./application/use-case/admin/slot/cleanUpSlots/ICleanupSlotsBeforeToday.usecase";
import { CleanupSlotsBeforeTodayUseCase } from "./application/use-case/admin/slot/cleanUpSlots/CleanupSlotsBeforeToday.usecase";
import { ICreateSlotUseCase } from "./application/use-case/admin/slot/createSlot/ICreateSlot.usecase";
import { CreateSlotUseCase } from "./application/use-case/admin/slot/createSlot/CreateSlot.usecase";
import { IDeleteSlotUseCase } from "./application/use-case/admin/slot/deleteSlot/IDeleteSlot.usecase";
import { IGetSlotUseCase } from "./application/use-case/admin/slot/getSlots/IGetSlot.usecase";
import { DeleteSlotUseCase } from "./application/use-case/admin/slot/deleteSlot/DeleteSlot.usecase";
import { GetSlotUseCase } from "./application/use-case/admin/slot/getSlots/GetSlot.usecase";
import { IMarkSlotAsBookedUseCase } from "./application/use-case/admin/slot/markAsBooked/IMarkSlotAsBooked.usecase";
import { MarkSlotAsBookedUseCase } from "./application/use-case/admin/slot/markAsBooked/MarkSlotAsBooked.usecase";
import { ExpireAdsUseCase } from "./application/use-case/admin/ads/expireAds/IExpireAds.usecase";
import { IChangeAdStatusUseCase } from "./application/use-case/admin/ads/changeAdStatus/IChangeAdStatus..usecase";
import { ChangeAdStatusUseCase } from "./application/use-case/admin/ads/changeAdStatus/ChangeAdStatus.usecase";
import { AdminGetAdsUseCase } from "./application/use-case/admin/ads/getAds/AdminGetAds.usecase";
import { EditAdUseCase } from "./application/use-case/ads-useCase/editAd/EditAd.usecase";
import { CreateAdUseCase } from "./application/use-case/ads-useCase/createAd/CreateAd.usecase";
import { IEditAdUseCase } from "./application/use-case/ads-useCase/editAd/IEditAd.usecase";
import { ICreateAdUseCase } from "./application/use-case/ads-useCase/createAd/ICreateAd.usecase";
import { IGetAllSubscriptionPlansUseCase } from "./application/use-case/admin/subscriptionManagement/getSubscription/IGetAllSubscriptionPlans.usecase";
import { IWithdrawFromProviderWalletUseCase } from "./application/use-case/admin/wallet/withdraw/IWithdrawFromProviderWallet.usecase";
import { GetProviderWalletUseCase } from "./application/use-case/admin/wallet/getWalletByid/GetProviderWalletById.usecase";
import { IGetAllUsers } from "./application/use-case/admin/userManagement/getAllUsers/IGetAllUsers.usecase";
import { GetAllUsersUseCase } from "./application/use-case/admin/userManagement/getAllUsers/GetAllUsers.usecase";
import { BlockUnblockUsers } from "./application/use-case/admin/userManagement/blockUnblockUsers/BlockUnblockUsers.usecase";
import { IBlockUnblockUsers } from "./application/use-case/admin/userManagement/blockUnblockUsers/IBlockUnblockUsers.usecase";
import { IGetServiceProviders } from "./application/use-case/admin/serviceProviderManagement/getServiceProvider/IGetServiceProviders.usecase";
import { GetServiceProviders } from "./application/use-case/admin/serviceProviderManagement/getServiceProvider/GetServiceProviders.usecase";
import { IGetAllServices } from "./application/use-case/admin/service-management/getService/IGetAllServices.usecase";
import { GetAllServices } from "./application/use-case/admin/service-management/getService/GetAllServices.usecase";
import { BlockUnblockCategoryService } from "./application/use-case/admin/category-management/blockUnblockService/BlockUnblockCategoryService.usecase";
import { IBlockUnblockCategoryService } from "./application/use-case/admin/category-management/blockUnblockService/IBlockUnblockCategoryService.usecase";
import { BlockUnblockSericeProvider } from "./application/use-case/admin/serviceProviderManagement/blockServiceProvider/BlockUnblockProvider.usecase";
import { IBlockUnblockSericeProvider } from "./application/use-case/admin/serviceProviderManagement/blockServiceProvider/IBlockUnblockSericeProvider.usecase";
import { IBlockUnblockService } from "./application/use-case/admin/service-management/blockUnblock/IBlockUnblock.usecase";
import { BlockUnblockService } from "./application/use-case/admin/service-management/blockUnblock/BlockUnblock.usecase";
import { IAddCategory } from "./application/use-case/admin/category-management/addCategoryy.ts/IAddCategory.usecase";
import { AddCategory } from "./application/use-case/admin/category-management/addCategoryy.ts/AddCategory.usecase";
import { GetCategory } from "./application/use-case/admin/category-management/getCategory/GetCategory.usecase";
import { IGetCategory } from "./application/use-case/admin/category-management/getCategory/IGetCategory.usecase";
import { IEditCategory } from "./application/use-case/admin/category-management/editCategory/IEditCategory.usecase";
import { EditCategory } from "./application/use-case/admin/category-management/editCategory/EditCategory.usecase";
import { IBlockUnblockCategory } from "./application/use-case/admin/category-management/blockUnblockCategory/IBlockUnblockCategory.usecase";
import { BlockUnblockCategory } from "./application/use-case/admin/category-management/blockUnblockCategory/BlockUnblockCategory.usecase";
import { DeleteCategory } from "./application/use-case/admin/category-management/deleteCategory/DeleteCategory.usecase";
import { IDeleteCategory } from "./application/use-case/admin/category-management/deleteCategory/IDeleteCategory.usecase";
import { IAddService } from "./application/use-case/admin/category-management/addService/IAddService.usecase";
import { AddService } from "./application/use-case/admin/category-management/addService/AddService.usecase";
import { IDeleteService } from "./application/use-case/admin/category-management/deleteService/IDeleteService.usecase";
import { DeleteService } from "./application/use-case/admin/category-management/deleteService/DeleteService.usecase";

container.register<IUserRepository>(REPOSITORY_TOKENS.UserRepository, {
  useClass: MongoUserRepository,
});
container.register<IServiceProviderRepository>(
  REPOSITORY_TOKENS.ServiceProviderRepository,
  {
    useClass: ServiceProviderRepository,
  }
);
-container.register(RegisterServiceProviderUseCase, {
  useClass: RegisterServiceProviderUseCase,
});
container.register<ICategoryRepository>(REPOSITORY_TOKENS.CategoryRepository, {
  useClass: CategoryRepository,
});
container.register<ISlotRepository>("ISlotRepository", {
  useClass: SlotRepository,
});

// repository
container.register<ISubscriptionPlanRepository>(
  REPOSITORY_TOKENS.SubscriptionRepository,
  {
    useClass: SubscriptionPlanRepository,
  }
);

container.register<IAiAssistanceRepository>(
  REPOSITORY_TOKENS.AiAssistanceRepository,
  {
    useClass: aiAssistanceRepository,
  }
);

container.register<IProviderWalletRepository>(
  REPOSITORY_TOKENS.WalletRepository,
  {
    useClass: ProviderWalletRepository,
  }
);

container.register<ICouponRepository>(REPOSITORY_TOKENS.CouponRepository, {
  useClass: CouponRepository,
});

container.registerSingleton<IEmailService>(
  SERVICE_TOKENS.EmailService,
  EmailService
);

container.registerSingleton<IOtpService>(SERVICE_TOKENS.Otpservice, Otpservice);
container.register(ResendOtp, { useClass: ResendOtp });
container.register(RegisterUser, { useClass: RegisterUser });
container.register<ITokenService>(SERVICE_TOKENS.TokenService, {
  useClass: TokenService,
});

container.registerSingleton<ICloudinaryService>(
  SERVICE_TOKENS.CloudinaryService,
  CloudinaryService
);
container.registerSingleton("SocketService", SocketService);

container.register(VerifyOtp, { useClass: VerifyOtp });

container.register<ISmsOtpService>(SERVICE_TOKENS.SmsOtpService, {
  useClass: SmsOtpService,
});

container.register<IRedisService>(SERVICE_TOKENS.RedisService, {
  useClass: RedisService,
});

container.register("LocationService", { useClass: LocationService });

container.register<IServiceRepository>(
  REPOSITORY_TOKENS.ServiceRepository,
  ServiceRepository
);

container.register("ServiceBookingRepository", ServiceBookingRepository);

ServiceBookingRepository;
container.register<IServiceBookingRepository>(
  REPOSITORY_TOKENS.ServiceBookingRepository,
  {
    useClass: ServiceBookingRepository,
  }
);

container.register(SERVICE_TOKENS.RazorpayService, RazorpayService);

container.register("ReviewRepository", { useClass: ReviewRepository });
container.register("NotificationRepository", {
  useClass: NotificationRepository,
});
container.registerSingleton<IChatRepository>("ChatRepository", ChatRepository);
container.register("SiteSettingRepository", SiteSettingRepository);

container.register(REPOSITORY_TOKENS.AdRepository, AdRepository);

console.log("All dependencies registered successfully.");

container.register<ICreateCouponUseCase>(USE_CASE_TOKENS.CreateCouponUseCase, {
  useClass: CreateCouponUseCase,
});

container.register<IFindAllCouponsUseCase>(
  USE_CASE_TOKENS.FindAllCouponsUseCase,
  {
    useClass: FindAllCouponsUseCase,
  }
);

container.register<IMakeCouponInactiveUseCase>(
  USE_CASE_TOKENS.MakeCouponInactiveUseCase,
  {
    useClass: MakeCouponInactiveUseCase,
  }
);

container.register<IToggleShowInBannerUseCase>(
  USE_CASE_TOKENS.CouponshowInBanner,
  {
    useClass: ToggleShowInBannerUseCase,
  }
);

container.register<IFindFeaturedCouponsUseCase>(
  USE_CASE_TOKENS.FindFeaturedCouponsUseCase,
  {
    useClass: FindFeaturedCouponsUseCase,
  }
);

container.register<IApplyCouponToBookingUseCase>(
  USE_CASE_TOKENS.ApplyCouponToBookingUseCase,
  {
    useClass: ApplyCouponToBookingUseCase,
  }
);

container.register<IRemoveCouponToBookingUseCase>(
  USE_CASE_TOKENS.RemoveCouponToBookingUseCase,
  {
    useClass: RemoveCouponToBookingUseCase,
  }
);

container.register<IGetWalletUseCase>(USE_CASE_TOKENS.GetWalletUseCase, {
  useClass: GetWalletUseCase,
});

container.register<IWithdrawPaymentUseCase>(
  USE_CASE_TOKENS.WithdrawPaymentUseCase,
  {
    useClass: WithdrawPaymentUseCase,
  }
);

container.register<IGetAllProvidersWalletsUseCase>(
  USE_CASE_TOKENS.GetAllProvidersWallets,
  {
    useClass: GetAllProvidersWallets,
  }
);

container.register<IGetProviderWalletUseCase>(
  USE_CASE_TOKENS.GetProviderWalletByIdUseCase,
  {
    useClass: GetProviderWalletUseCase,
  }
);

container.register<IWithdrawFromProviderWalletUseCase>(
  USE_CASE_TOKENS.WithdrawFromProviderWalletUseCase,
  { useClass: WithdrawFromProviderWalletUseCase }
);

container.register<IGetSubscriptionPlansUseCase>(
  USE_CASE_TOKENS.GetSubscriptionPlansUseCase,
  {
    useClass: GetSubscriptionPlansUseCase,
  }
);

container.register<ICreatePaymentSubscriptionOrderUseCase>(
  USE_CASE_TOKENS.CreatePaymentSubscriptionOrderUseCase,
  {
    useClass: CreatePaymentSubscriptionOrderUseCase,
  }
);

container.register<ICreatePaymentSubscriptionOrderUseCase>(
  USE_CASE_TOKENS.CreatePaymentSubscriptionOrderUseCase,
  {
    useClass: CreatePaymentSubscriptionOrderUseCase,
  }
);

container.register<IVerifySubscriptionPaymentUseCase>(
  USE_CASE_TOKENS.VerifySubscriptionPaymentUseCase,
  {
    useClass: VerifySubscriptionPaymentUseCase,
  }
);

container.register<ICreateAiChatUseCase>(USE_CASE_TOKENS.CreateAiChatUseCase, {
  useClass: CreateAiChatUseCase,
});

container.register<IGetAIChatByIdUseCase>(
  USE_CASE_TOKENS.GetAIChatByIdUseCase,
  {
    useClass: GetAIChatByIdUseCase,
  }
);

container.register<IGetProviderAIChatsUseCase>(
  USE_CASE_TOKENS.GetProviderAIChatsUseCase,
  {
    useClass: GetProviderAIChatsUseCase,
  }
);

container.register<IManageServiceProviderSubscriptionsUseCase>(
  USE_CASE_TOKENS.ManageServiceProviderSubscriptionsUseCase,
  {
    useClass: ManageServiceProviderSubscriptionsUseCase,
  }
);

container.register<IGetAllSubscriptionPlansUseCase>(
  USE_CASE_TOKENS.GetAllSubscriptionPlansUseCase,
  {
    useClass: GetAllSubscriptionPlansUseCase,
  }
);

container.register<ICreateSubscriptionPlanUseCase>(
  USE_CASE_TOKENS.CreateSubscriptionPlanUseCase,
  {
    useClass: CreateSubscriptionPlanUseCase,
  }
);

container.register<IUpdateSubscriptionPlanUseCase>(
  USE_CASE_TOKENS.UpdateSubscriptionPlanUseCase,
  {
    useClass: UpdateSubscriptionPlanUseCase,
  }
);

// ADS

container.register<IEditAdUseCase>(USE_CASE_TOKENS.EditAdUseCase, {
  useClass: EditAdUseCase,
});
container.register<ICreateAdUseCase>(USE_CASE_TOKENS.CreateAdUseCase, {
  useClass: CreateAdUseCase,
});
container.register<IGetProviderAdsUseCase>(
  USE_CASE_TOKENS.GetProviderAdsUseCase,
  {
    useClass: GetProviderAdsUseCase,
  }
);

container.register<IAdminGetAdsUseCase>(USE_CASE_TOKENS.AdminGetAdsUseCase, {
  useClass: AdminGetAdsUseCase,
});

container.register<IGetServiceNamesUseCase>(
  USE_CASE_TOKENS.GetServiceNamesUseCase,
  {
    useClass: GetServiceNamesUseCase,
  }
);

container.register<IChangeAdStatusUseCase>(
  USE_CASE_TOKENS.ChangeAdStatusUseCase,
  {
    useClass: ChangeAdStatusUseCase,
  }
);

container.register<IRecommendAdsUseCase>(USE_CASE_TOKENS.RecommendAdsUseCase, {
  useClass: RecommendAdsUseCase,
});

container.register<IExpireAdsUseCase>(USE_CASE_TOKENS.ExpireAdsUseCase, {
  useClass: ExpireAdsUseCase,
});

container.register<IIncreaseAdClicksUseCase>(
  USE_CASE_TOKENS.IncreaseAdClicksUseCase,
  {
    useClass: IncreaseAdClicksUseCase,
  }
);

// services
container.register<IGoogleGenAIService>(SERVICE_TOKENS.GoogleGenAIService, {
  useClass: GoogleGenAIService,
});

// bookings

container.register<IUpdateBookingStatusUseCase>(
  USE_CASE_TOKENS.UpdateBookingStatusUseCase,
  {
    useClass: UpdateBookingStatusUseCase,
  }
);

container.register<IConfirmBookingUseCase>(
  USE_CASE_TOKENS.ConfirmBookingUseCase,
  {
    useClass: ConfirmBookingUseCase,
  }
);

container.register<ICancelBookingUseCase>(
  USE_CASE_TOKENS.CancelBookingUseCase,
  {
    useClass: CancelBookingUseCase,
  }
);

container.register<IRequestPaymentUseCase>(
  USE_CASE_TOKENS.RequestPaymentUseCase,
  {
    useClass: RequestPaymentUseCase,
  }
);

container.register<ICreateBookingUseCase>(
  USE_CASE_TOKENS.CreateBookingUseCase,
  {
    useClass: CreateBookingUseCase,
  }
);

container.register<ICreateOnlineBookingUseCase>(
  USE_CASE_TOKENS.CreateOnlineBookingUseCase,
  {
    useClass: CreateOnlineBookingUseCase,
  }
);

container.register<IGetBookedServicesUseCase>(
  USE_CASE_TOKENS.GetBookedServicesUseCase,
  {
    useClass: GetBookedServicesUseCase,
  }
);

container.register<IGetBookedServiceByIdUseCase>(
  USE_CASE_TOKENS.GetBookedServiceByIdUseCase,
  {
    useClass: GetBookedServiceByIdUseCase,
  }
);

// container.register(USE_CASE_TOKENS.CleanupSlotsBeforeTodayUseCase, {
//   useClass: CleanupSlotsBeforeTodayUseCase,
// });

container.register<IMarkSlotAsBookedUseCase>(
  USE_CASE_TOKENS.MarkSlotAsBookedUseCase,
  {
    useClass: MarkSlotAsBookedUseCase,
  }
);

container.register<IGetSlotUseCase>(USE_CASE_TOKENS.GetSlotUseCase, {
  useClass: GetSlotUseCase,
});

container.register<IDeleteSlotUseCase>(USE_CASE_TOKENS.DeleteSlotUseCase, {
  useClass: DeleteSlotUseCase,
});

container.register<ICreateSlotUseCase>(USE_CASE_TOKENS.CreateSlotUseCase, {
  useClass: CreateSlotUseCase,
});

container.register<ICleanupSlotsBeforeTodayUseCase>(
  USE_CASE_TOKENS.CleanupSlotsBeforeTodayUseCase,
  {
    useClass: CleanupSlotsBeforeTodayUseCase,
  }
);

container.register<IRescheduleOnlineServiceSlotUseCase>(
  USE_CASE_TOKENS.RescheduleOnlineServiceSlotUseCase,
  {
    useClass: RescheduleOnlineServiceSlotUseCase,
  }
);

container.register<IGetServiceProviderRegistrationDetailsUseCase>(
  USE_CASE_TOKENS.GetServiceProviderRegistrationDetailsUseCase,
  {
    useClass: GetServiceProviderRegistrationDetailsUseCase,
  }
);

container.register<IGetServiceProviderStatusUseCase>(
  USE_CASE_TOKENS.GetServiceProviderStatusUseCase,
  {
    useClass: GetServiceProviderStatusUseCase,
  }
);

container.register<IReapplyServiceProviderUseCase>(
  USE_CASE_TOKENS.ReapplyServiceProviderUseCase,
  {
    useClass: ReapplyServiceProviderUseCase,
  }
);

container.register<IGetAllUsers>(USE_CASE_TOKENS.GetAllUsers, {
  useClass: GetAllUsersUseCase,
});

container.register<IBlockUnblockUsers>(USE_CASE_TOKENS.BlockUnblockUsers, {
  useClass: BlockUnblockUsers,
});

container.register<IGetServiceProviders>(USE_CASE_TOKENS.GetServiceProviders, {
  useClass: GetServiceProviders,
});

container.register<IGetAllServices>(USE_CASE_TOKENS.GetAllServices, {
  useClass: GetAllServices,
});

container.register<IBlockUnblockCategoryService>(
  USE_CASE_TOKENS.BlockUnblockCategoryService,
  {
    useClass: BlockUnblockCategoryService,
  }
);

container.register<IBlockUnblockSericeProvider>(
  USE_CASE_TOKENS.BlockUnblockSericeProvider,
  {
    useClass: BlockUnblockSericeProvider,
  }
);

container.register<IBlockUnblockService>(USE_CASE_TOKENS.BlockUnblockService, {
  useClass: BlockUnblockService,
});

container.register<IAddCategory>(USE_CASE_TOKENS.AddCategory, {
  useClass: AddCategory,
});

container.register<IGetCategory>(USE_CASE_TOKENS.GetCategory, {
  useClass: GetCategory,
});

container.register<IEditCategory>(USE_CASE_TOKENS.EditCategory, {
  useClass: EditCategory,
});

container.register<IBlockUnblockCategory>(
  USE_CASE_TOKENS.BlockUnblockCategory,
  {
    useClass: BlockUnblockCategory,
  }
);

container.register<IDeleteCategory>(USE_CASE_TOKENS.DeleteCategory, {
  useClass: DeleteCategory,
});

container.register<IAddService>(USE_CASE_TOKENS.AddService, {
  useClass: AddService,
});

container.register<IDeleteService>(USE_CASE_TOKENS.DeleteService, {
  useClass: DeleteService,
});
