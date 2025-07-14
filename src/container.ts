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
import { IProviderWalletRepository } from './domain/repositories/IproviderWallet';
import { ICouponRepository } from './domain/repositories/IcouponRepository';
import { CouponRepository } from './infrastructure/repositories/couponRepository';
import { ICreateCouponUseCase } from './application/use-case/coupon/createCoupon/ICreateCouponUseCase';
import { IFindAllCouponsUseCase } from './application/use-case/coupon/findAllCoupons/IFindAllCouponsUseCase';
import { CreateCouponUseCase } from './application/use-case/coupon/createCoupon/CreateCouponUseCase';
import { FindAllCouponsUseCase } from './application/use-case/coupon/findAllCoupons/FindAllCouponsUseCase';
import { USE_CASE_TOKENS } from './utils/constants/tokens';
import { MakeCouponInactiveUseCase } from './application/use-case/coupon/makeCouponInactive/MakeCouponInactiveUseCase';
import { IMakeCouponInactiveUseCase } from './application/use-case/coupon/makeCouponInactive/IMakeCouponInactiveUseCase';
import { IToggleShowInBannerUseCase } from './application/use-case/coupon/toggleShowInBanner/IToggleShowInBannerUseCase';
import { ToggleShowInBannerUseCase } from './application/use-case/coupon/toggleShowInBanner/ToggleShowInBannerUseCase';
import { IFindFeaturedCouponsUseCase } from './application/use-case/coupon/FeaturedCoupons/IFindFeaturedCouponsUseCase';
import { FindFeaturedCouponsUseCase } from './application/use-case/coupon/FeaturedCoupons/FindFeaturedCouponsUseCase';

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

container.register<IProviderWalletRepository>('IProviderWalletRepository', {
  useClass: ProviderWalletRepository,
});

container.register<ICouponRepository>('ICouponRepository', 
  { useClass: CouponRepository 

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