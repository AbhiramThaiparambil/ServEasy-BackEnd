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
import { ICreateCouponUseCase } from "./application/use-case/coupon/createCoupon/ICreateCouponUseCase";
import { IFindAllCouponsUseCase } from "./application/use-case/coupon/findAllCoupons/IFindAllCouponsUseCase";
import { CreateCouponUseCase } from "./application/use-case/coupon/createCoupon/CreateCouponUseCase";
import { FindAllCouponsUseCase } from "./application/use-case/coupon/findAllCoupons/FindAllCouponsUseCase";
import {
  REPOSITORY_TOKENS,
  SERVICE_TOKENS,
  USE_CASE_TOKENS,
} from "./constants/tokens";
import { MakeCouponInactiveUseCase } from "./application/use-case/coupon/makeCouponInactive/MakeCouponInactiveUseCase";
import { IMakeCouponInactiveUseCase } from "./application/use-case/coupon/makeCouponInactive/IMakeCouponInactiveUseCase";
import { IToggleShowInBannerUseCase } from "./application/use-case/coupon/toggleShowInBanner/IToggleShowInBannerUseCase";
import { ToggleShowInBannerUseCase } from "./application/use-case/coupon/toggleShowInBanner/ToggleShowInBannerUseCase";
import { IFindFeaturedCouponsUseCase } from "./application/use-case/coupon/FeaturedCoupons/IFindFeaturedCouponsUseCase";
import { FindFeaturedCouponsUseCase } from "./application/use-case/coupon/FeaturedCoupons/FindFeaturedCouponsUseCase";
import { ApplyCouponToBookingUseCase } from "./application/use-case/coupon/applyCoupon/ApplyCouponToBookingUseCase";
import { IApplyCouponToBookingUseCase } from "./application/use-case/coupon/applyCoupon/IApplyCouponToBookingUseCase";
import { IRemoveCouponToBookingUseCase } from "./application/use-case/coupon/removeCoupon/IRemoveCoupon";
import { RemoveCouponToBookingUseCase } from "./application/use-case/coupon/removeCoupon/RemoveCoupon";
import { GetWalletUseCase } from "./application/use-case/serviceProvider/wallet/getWallet/GetWalletUseCase";
import { IGetWalletUseCase } from "./application/use-case/serviceProvider/wallet/getWallet/IGetWalletUseCase";
import { IWithdrawPaymentUseCase } from "./application/use-case/serviceProvider/wallet/withdrawPayment/IWithdrawPaymentUseCase";
import { WithdrawPaymentUseCase } from "./application/use-case/serviceProvider/wallet/withdrawPayment/WithdrawPaymentUseCase";
import { IGetAllProvidersWalletsUseCase } from "./application/use-case/admin/wallet/getWallet/IGetAllProvidersWallets.usecase";
import { GetAllProvidersWallets } from "./application/use-case/admin/wallet/getWallet/GetAllProvidersWallets.usecase";
import { GetProviderWalletUseCase } from "./application/use-case/admin/wallet/getWallet/GetProviderWalletById.usecase";
import { IGetProviderWalletUseCase } from "./application/use-case/admin/wallet/getWallet/IGetProviderWalletById.usecase";
import { IWithdrawFromProviderWalletUseCase } from "./application/use-case/admin/wallet/IWithdrawFromProviderWallet.usecase";
import { WithdrawFromProviderWalletUseCase } from "./application/use-case/admin/wallet/WithdrawFromProviderWallet.usecase";
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
import { ICreateAiChatUseCase } from "./application/use-case/premiumFeatures/aiAssistance/create/ICreateAiChatUseCase";
import { CreateAiChatUseCase } from "./application/use-case/premiumFeatures/aiAssistance/create/CreateAiChatUseCasets";
import { IGetAIChatByIdUseCase } from "./application/use-case/premiumFeatures/aiAssistance/getById/IGetAIChatByIdUseCase";
import { GetAIChatByIdUseCase } from "./application/use-case/premiumFeatures/aiAssistance/getById/GetAIChatByIdUseCase";
import { IGetProviderAIChatsUseCase } from "./application/use-case/premiumFeatures/aiAssistance/getByServiceProvidersId/IGetProviderAIChatsUseCase";
import { GetProviderAIChatsUseCase } from "./application/use-case/premiumFeatures/aiAssistance/getByServiceProvidersId/GetProviderAIChatsUseCase";
import { ManageServiceProviderSubscriptionsUseCase } from "./application/use-case/subscription/ManageServiceProviderSubscriptionsUseCase";
import { IManageServiceProviderSubscriptionsUseCase } from "./application/use-case/subscription/IManageServiceProviderSubscriptionsUseCase";
import { connect } from "http2";
import { IGetAllSubscriptionPlansUseCase } from "./application/use-case/admin/subscriptionManagement/IGetAllSubscriptionPlansUseCase";
import { GetAllSubscriptionPlansUseCase } from "./application/use-case/admin/subscriptionManagement/GetAllSubscriptionPlansUseCase";
import { ICreateSubscriptionPlanUseCase } from "./application/use-case/admin/subscriptionManagement/ICreateSubscriptionPlanUseCase";
import { CreateSubscriptionPlanUseCase } from "./application/use-case/admin/subscriptionManagement/CreateSubscriptionPlanUseCase";
import { IUpdateSubscriptionPlanUseCase } from "./application/use-case/admin/subscriptionManagement/IUpdateSubscriptionPlanUseCase";
import { UpdateSubscriptionPlanUseCase } from "./application/use-case/admin/subscriptionManagement/UpdateSubscriptionPlanUseCase";
import { AdRepository } from "./infrastructure/repositories/AdRepository";
import { IEditAdUseCase } from "./application/use-case/ads-useCase/IEditAdUseCase";
import { EditAdUseCase } from "./application/use-case/ads-useCase/EditAdUseCase";
import { ICreateAdUseCase } from "./application/use-case/ads-useCase/ICreateAdUseCase";
import { CreateAdUseCase } from "./application/use-case/ads-useCase/CreateAdUseCase";
import { IGetProviderAdsUseCase } from "./application/use-case/ads-useCase/IGetProviderAdsUseCase";
import { GetProviderAdsUseCase } from "./application/use-case/ads-useCase/GetProviderAdsUseCase";
import { IServiceRepository } from "./domain/repositories/IServiceRepository";
import { IGetServiceNamesUseCase } from "./application/use-case/admin/service-management/IGetServiceNamesUseCase";
import { GetServiceNamesUseCase } from "./application/use-case/admin/service-management/GetServiceNamesUseCase";
import { IAdminGetAdsUseCase } from "./application/use-case/admin/ads/IAdminGetAdsUseCase";
import { AdminGetAdsUseCase } from "./application/use-case/admin/ads/AdminGetAdsUseCase";
import { IChangeAdStatusUseCase } from "./application/use-case/admin/ads/IChangeAdStatusUseCase";
import { ChangeAdStatusUseCase } from "./application/use-case/admin/ads/ChangeAdStatusUseCase";
import { IRecommendAdsUseCase } from "./application/use-case/User/Ads/IRecommendAdsUseCase";
import { RecommendAdsUseCase } from "./application/use-case/User/Ads/RecommendAdsUseCase";
import { IExpireAdsUseCase } from "./application/use-case/admin/ads/ExpireAdsUseCase";
import { ExpireAdsUseCase } from "./application/use-case/admin/ads/IExpireAdsUseCase";
import { IIncreaseAdClicksUseCase } from "./application/use-case/User/Ads/IIncreaseAdClicksUseCase";
import { IncreaseAdClicksUseCase } from "./application/use-case/User/Ads/IncreaseAdClicksUseCase";
import { IUpdateBookingStatusUseCase } from "./application/use-case/booking/updateBookingStatus/IUpdateBookingStatusUseCase";
import { UpdateBookingStatusUseCase } from "./application/use-case/booking/updateBookingStatus/UpdateBookingStatusUseCase";
import { IConfirmBookingUseCase } from "./application/use-case/booking/confirmBooking/IConfirmBookingUseCase";
import { ConfirmBookingUseCase } from "./application/use-case/booking/confirmBooking/ConfirmBookingUseCase";
import { ICancelBookingUseCase } from "./application/use-case/booking/cancelBooking/ICancelBookingUseCase";
import { CancelBookingUseCase } from "./application/use-case/booking/cancelBooking/CancelBookingUseCase";
import { IRequestPaymentUseCase } from "./application/use-case/booking/requestPayment/IRequestPaymentUseCase";
import { RequestPaymentUseCase } from "./application/use-case/booking/requestPayment/RequestPaymentUseCase";
import { ICreateOnlineBookingUseCase } from "./application/use-case/booking/createOnlineBooking/ICreateOnlineBookingUseCase";
import { CreateOnlineBookingUseCase } from "./application/use-case/booking/createOnlineBooking/CreateOnlineBookingUseCase";
import { CreateBookingUseCase } from "./application/use-case/booking/createBooking/CreateBookingUseCase";
import { ICreateBookingUseCase } from "./application/use-case/booking/createBooking/ICreateBookingUseCase";
import { GetBookedServicesUseCase } from "./application/use-case/booking/fetchBookings/GetBookedServicesUseCase";
import { IGetBookedServicesUseCase } from "./application/use-case/booking/fetchBookings/IGetBookedServicesUseCase";
import { IGetBookedServiceByIdUseCase } from "./application/use-case/booking/fetchBookings/IGetBookedServiceByIdUseCase";
import { GetBookedServiceByIdUseCase } from "./application/use-case/booking/fetchBookings/GetBookedServiceByIdUseCase";
import { CleanupSlotsBeforeTodayUseCase } from "./application/use-case/admin/slot/CleanupSlotsBeforeTodayUseCase";
import { MarkSlotAsBookedUseCase } from "./application/use-case/admin/slot/MarkSlotAsBookedUseCase";
import { DeleteSlotUseCase } from "./application/use-case/admin/slot/DeleteSlotUseCase";
import { CreateSlotUseCase } from "./application/use-case/admin/slot/CreateSlotUseCase";
import { GetSlotUseCase } from "./application/use-case/admin/slot/GetSlotUseCase";
import { IServiceBookingRepository } from "./domain/repositories/IserviceBookingRepository";
import { RescheduleOnlineServiceSlotUseCase } from "./application/use-case/booking/createOnlineBooking/RescheduleOnlineServiceUseCase";
import { IRescheduleOnlineServiceSlotUseCase } from "./application/use-case/booking/createOnlineBooking/IRescheduleOnlineServiceUseCase";
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
container.register<ICategoryRepository>("ICategoryRepository", {
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

container.register(USE_CASE_TOKENS.CleanupSlotsBeforeTodayUseCase, {
  useClass: CleanupSlotsBeforeTodayUseCase,
});

container.register(USE_CASE_TOKENS.MarkSlotAsBookedUseCase, {
  useClass: MarkSlotAsBookedUseCase,
});

container.register(USE_CASE_TOKENS.GetSlotUseCase, {
  useClass: GetSlotUseCase,
});

container.register(USE_CASE_TOKENS.DeleteSlotUseCase, {
  useClass: DeleteSlotUseCase,
});

container.register(USE_CASE_TOKENS.CreateSlotUseCase, {
  useClass: CreateSlotUseCase,
});

container.register(USE_CASE_TOKENS.CleanupSlotsBeforeTodayUseCase, {
  useClass: CleanupSlotsBeforeTodayUseCase,
});

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
