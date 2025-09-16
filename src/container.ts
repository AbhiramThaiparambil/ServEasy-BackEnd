import 'reflect-metadata';
import { MongoUserRepository } from './infrastructure/repositories/UserRepositoriey';
import { ServiceProviderRepository } from './infrastructure/repositories/ServiceProviderRepository';
import { IServiceProviderRepository } from './domain/repositories/IserviceProviderRepository';
import { ICategoryRepository } from './domain/repositories/IcategoryRepository';
import { IUserRepository } from './domain/repositories/IuserRepository';
import { container } from 'tsyringe';
import { EmailOtpService } from './services/OTP/mailOtp';
import { Otpservice } from './services/OTP/OtpService';
import { RegisterUser } from './application/use-case/User/auth/RegisterUser';
import { RedisService } from './services/RedisService';
import { SmsOtpService } from './services/OTP/phoneOtp';
import { ResendOtp } from './application/use-case/User/auth/ResendOtp';
import { TokenService } from './services/auth/TokenService';
import { CloudinaryService } from './services/cloudinary/cloudinary';
import { RegisterServiceProviderUseCase } from './application/use-case/serviceProvider/auth/RegisterServiceProvider';
import { LocationService } from './services/location/location';
import { ServiceRepository } from './infrastructure/repositories/ServiceRepositorie';
import { CategoryRepository } from './infrastructure/repositories/categoryRepository';
import { ServiceBookingRepository } from './infrastructure/repositories/ServiceBookingRepository';
import { RazorpayService } from './services/razorpayService';
import { ChatRepository } from './infrastructure/repositories/ChatRepository';
import { IChatRepository } from './domain/repositories/IChatRepository';
import { ReviewRepository } from './infrastructure/repositories/ReviewRepository';
import { VerifyOtp } from './application/use-case/User/auth/VerifyOtp';
import { NotificationRepository } from './infrastructure/repositories/NotificationRepository';
import { SiteSettingRepository } from './infrastructure/repositories/SiteSettingRepository';
import { ISlotRepository } from './domain/repositories/ISlotRepository';
import { SlotRepository } from './infrastructure/repositories/SlotRepository';
import { SocketService } from './services/socket/SocketService';
import { ProviderWalletRepository } from './infrastructure/repositories/providerWalletRepository';
import { IProviderWalletRepository } from './domain/repositories/IproviderWalletRepository';
import { ICouponRepository } from './domain/repositories/IcouponRepository';
import { CouponRepository } from './infrastructure/repositories/couponRepository';
import { ICreateCouponUseCase } from './application/use-case/coupon/createCoupon/ICreateCouponUseCase';
import { IFindAllCouponsUseCase } from './application/use-case/coupon/findAllCoupons/IFindAllCouponsUseCase';
import { CreateCouponUseCase } from './application/use-case/coupon/createCoupon/CreateCouponUseCase';
import { FindAllCouponsUseCase } from './application/use-case/coupon/findAllCoupons/FindAllCouponsUseCase';
import { REPOSITORY_TOKENS, SERVICE_TOKENS, USE_CASE_TOKENS } from './utils/constants/tokens';
import { MakeCouponInactiveUseCase } from './application/use-case/coupon/makeCouponInactive/MakeCouponInactiveUseCase';
import { IMakeCouponInactiveUseCase } from './application/use-case/coupon/makeCouponInactive/IMakeCouponInactiveUseCase';
import { IToggleShowInBannerUseCase } from './application/use-case/coupon/toggleShowInBanner/IToggleShowInBannerUseCase';
import { ToggleShowInBannerUseCase } from './application/use-case/coupon/toggleShowInBanner/ToggleShowInBannerUseCase';
import { IFindFeaturedCouponsUseCase } from './application/use-case/coupon/FeaturedCoupons/IFindFeaturedCouponsUseCase';
import { FindFeaturedCouponsUseCase } from './application/use-case/coupon/FeaturedCoupons/FindFeaturedCouponsUseCase';
import { ApplyCouponToBookingUseCase } from './application/use-case/bookService/coupons/ApplyCouponToBookingUseCase';
import { IApplyCouponToBookingUseCase } from './application/use-case/bookService/coupons/IApplyCouponToBookingUseCase';
import { IRemoveCouponToBookingUseCase } from './application/use-case/bookService/coupons/IRemoveCoupon';
import { RemoveCouponToBookingUseCase } from './application/use-case/bookService/coupons/RemoveCoupon';
import { GetWalletUseCase } from './application/use-case/serviceProvider/wallet/getWallet/GetWalletUseCase';
import { IGetWalletUseCase } from './application/use-case/serviceProvider/wallet/getWallet/IGetWalletUseCase';
import { IWithdrawPaymentUseCase } from './application/use-case/serviceProvider/wallet/withdrawPayment/IWithdrawPaymentUseCase';
import { WithdrawPaymentUseCase } from './application/use-case/serviceProvider/wallet/withdrawPayment/WithdrawPaymentUseCase';
import { IGetAllProvidersWalletsUseCase } from './application/use-case/admin/wallet/getWallet/IGetAllProvidersWallets.usecase';
import { GetAllProvidersWallets } from './application/use-case/admin/wallet/getWallet/GetAllProvidersWallets.usecase';
import { GetProviderWalletUseCase } from './application/use-case/admin/wallet/getWallet/GetProviderWalletById.usecase';
import { IGetProviderWalletUseCase } from './application/use-case/admin/wallet/getWallet/IGetProviderWalletById.usecase';
import { IWithdrawFromProviderWalletUseCase } from './application/use-case/admin/wallet/IWithdrawFromProviderWallet.usecase';
import { WithdrawFromProviderWalletUseCase } from './application/use-case/admin/wallet/WithdrawFromProviderWallet.usecase';
import { ISubscriptionPlanRepository } from './domain/repositories/ISubscriptionPlanRepository';
import { SubscriptionPlanRepository } from './infrastructure/repositories/SubscriptionPlanRepository';
import { IGetSubscriptionPlansUseCase } from './application/use-case/subscription/IGetSubscriptionPlansUseCase';
import { GetSubscriptionPlansUseCase } from './application/use-case/subscription/GetSubscriptionPlansUseCase';
import { ICreatePaymentSubscriptionOrderUseCase } from './application/use-case/subscription/payment/ICreatePaymentSubscriptionOrderUseCase';
import { CreatePaymentSubscriptionOrderUseCase } from './application/use-case/subscription/payment/CreatePaymentSubscriptionOrderUseCase';
import { IVerifySubscriptionPaymentUseCase } from './application/use-case/subscription/payment/IVerifySubscriptionPaymentUseCase';
import { VerifySubscriptionPaymentUseCase } from './application/use-case/subscription/payment/VerifySubscriptionPaymentUseCase';
import { GoogleGenAIService } from './services/aiAssistant/googleGenAIService';
import { IGoogleGenAIService } from './services/aiAssistant/IgoogleGenAIService';
import { IAiAssistanceRepository } from './domain/repositories/IAiAssistanceRepository';
import { aiAssistanceRepository } from './infrastructure/repositories/AiAssistanceRepository';
import { ICreateAiChatUseCase } from './application/use-case/premiumFeatures/aiAssistance/create/ICreateAiChatUseCase';
import { CreateAiChatUseCase } from './application/use-case/premiumFeatures/aiAssistance/create/CreateAiChatUseCasets';
import { IGetAIChatByIdUseCase } from './application/use-case/premiumFeatures/aiAssistance/getById/IGetAIChatByIdUseCase';
import { GetAIChatByIdUseCase } from './application/use-case/premiumFeatures/aiAssistance/getById/GetAIChatByIdUseCase';
import { IGetProviderAIChatsUseCase } from './application/use-case/premiumFeatures/aiAssistance/getByServiceProvidersId/IGetProviderAIChatsUseCase';
import { GetProviderAIChatsUseCase } from './application/use-case/premiumFeatures/aiAssistance/getByServiceProvidersId/GetProviderAIChatsUseCase';

container.register<IUserRepository>('UserRepository', {
  useClass: MongoUserRepository,
});
container.register<IServiceProviderRepository>('IServiceProviderRepository', {
  useClass: ServiceProviderRepository,
});
container.register(RegisterServiceProviderUseCase, {
  useClass: RegisterServiceProviderUseCase,
});
container.register<ICategoryRepository>('ICategoryRepository', {
  useClass: CategoryRepository,
});
container.register<ISlotRepository>('ISlotRepository', {
  useClass: SlotRepository,
});

// repository 
container.register<ISubscriptionPlanRepository>(REPOSITORY_TOKENS.SubscriptionRepository, {
  useClass: SubscriptionPlanRepository,
});

container.register<IAiAssistanceRepository>(REPOSITORY_TOKENS.AiAssistanceRepository, {
  useClass: aiAssistanceRepository,
});


container.register<IProviderWalletRepository>(REPOSITORY_TOKENS.WalletRepository, {
  useClass: ProviderWalletRepository,
});

container.register<ICouponRepository>(REPOSITORY_TOKENS.CouponRepository, {
  useClass: CouponRepository,
});

container.registerSingleton('EmailOtpService', EmailOtpService);
container.registerSingleton('OtpService', Otpservice);
container.register(ResendOtp, { useClass: ResendOtp });
container.register(RegisterUser, { useClass: RegisterUser });
container.register<TokenService>('TokenService', { useClass: TokenService });
container.registerSingleton('CloudinaryService', CloudinaryService);
container.registerSingleton('SocketService', SocketService);
container.register(VerifyOtp, { useClass: VerifyOtp });
container.register('SmsOtpService', SmsOtpService);
container.register('RedisService', RedisService);
container.register('LocationService', { useClass: LocationService });
container.register('ServiceRepository', ServiceRepository);
container.register('ServiceBookingRepository', ServiceBookingRepository);
container.register('RazorpayService', RazorpayService);


container.register('ReviewRepository', { useClass: ReviewRepository });
container.register('NotificationRepository', { useClass: NotificationRepository });
container.registerSingleton<IChatRepository>('ChatRepository', ChatRepository);
container.register('SiteSettingRepository', SiteSettingRepository);
console.log('All dependencies registered successfully.');



container.register<ICreateCouponUseCase>(USE_CASE_TOKENS.CreateCouponUseCase, {
  useClass: CreateCouponUseCase,
});

container.register<IFindAllCouponsUseCase>(USE_CASE_TOKENS.FindAllCouponsUseCase, {
  useClass: FindAllCouponsUseCase,
});

container.register<IMakeCouponInactiveUseCase>(USE_CASE_TOKENS.MakeCouponInactiveUseCase, {
  useClass: MakeCouponInactiveUseCase,
});

container.register<IToggleShowInBannerUseCase>(USE_CASE_TOKENS.CouponshowInBanner, {
  useClass: ToggleShowInBannerUseCase,
});

container.register<IFindFeaturedCouponsUseCase>(USE_CASE_TOKENS.FindFeaturedCouponsUseCase, {
  useClass: FindFeaturedCouponsUseCase,
});

container.register<IApplyCouponToBookingUseCase>(USE_CASE_TOKENS.ApplyCouponToBookingUseCase, {
  useClass: ApplyCouponToBookingUseCase,
});

container.register<IRemoveCouponToBookingUseCase>(USE_CASE_TOKENS.RemoveCouponToBookingUseCase, {
  useClass: RemoveCouponToBookingUseCase,
});

container.register<IGetWalletUseCase>(USE_CASE_TOKENS.GetWalletUseCase, {
  useClass: GetWalletUseCase,
});

container.register<IWithdrawPaymentUseCase>(USE_CASE_TOKENS.WithdrawPaymentUseCase, {
  useClass: WithdrawPaymentUseCase,
});

container.register<IGetAllProvidersWalletsUseCase>(USE_CASE_TOKENS.GetAllProvidersWallets, {
  useClass: GetAllProvidersWallets,
});

container.register<IGetProviderWalletUseCase>(USE_CASE_TOKENS.GetProviderWalletByIdUseCase, {
  useClass: GetProviderWalletUseCase,
});

container.register<IWithdrawFromProviderWalletUseCase>(
  USE_CASE_TOKENS.WithdrawFromProviderWalletUseCase,
  { useClass: WithdrawFromProviderWalletUseCase }
);


container.register<IGetSubscriptionPlansUseCase>(USE_CASE_TOKENS.GetSubscriptionPlansUseCase,{
  useClass:GetSubscriptionPlansUseCase
})



container.register<ICreatePaymentSubscriptionOrderUseCase>(USE_CASE_TOKENS.CreatePaymentSubscriptionOrderUseCase,{
  useClass:CreatePaymentSubscriptionOrderUseCase
})



container.register<ICreatePaymentSubscriptionOrderUseCase>(USE_CASE_TOKENS.CreatePaymentSubscriptionOrderUseCase,{
  useClass:CreatePaymentSubscriptionOrderUseCase
})

container.register<IVerifySubscriptionPaymentUseCase>(USE_CASE_TOKENS.VerifySubscriptionPaymentUseCase,{
  useClass:VerifySubscriptionPaymentUseCase
})

container.register<ICreateAiChatUseCase>(USE_CASE_TOKENS.CreateAiChatUseCase,{
  useClass:CreateAiChatUseCase
})

container.register<IGetAIChatByIdUseCase>(USE_CASE_TOKENS.GetAIChatByIdUseCase,{
  useClass:GetAIChatByIdUseCase
})

container.register<IGetProviderAIChatsUseCase>(USE_CASE_TOKENS.GetProviderAIChatsUseCase,{
  useClass:GetProviderAIChatsUseCase
})

// services
container.register<IGoogleGenAIService>(SERVICE_TOKENS.GoogleGenAIService
, { useClass: GoogleGenAIService });
