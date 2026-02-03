import "reflect-metadata";
import { MongoUserRepository } from "./infrastructure/repositories/UserRepositoriey";
import { ServiceProviderRepository } from "./infrastructure/repositories/ServiceProviderRepository";
import { IServiceProviderRepository } from "./domain/repositories/IserviceProviderRepository";
import { ICategoryRepository } from "./domain/repositories/IcategoryRepository";
import { IUserRepository } from "./domain/repositories/IuserRepository";
import { container } from "tsyringe";
import { EmailService } from "./services/mailService/MailService";
import { Otpservice } from "./services/otp/OtpService";
import { RedisService } from "./services/redis/RedisService";
import { SmsOtpService } from "./services/otp/SmsOtpService";
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
import { NotificationRepository } from "./infrastructure/repositories/NotificationRepository";
import { SiteSettingRepository } from "./infrastructure/repositories/SiteSettingRepository";
import { ISiteSettingRepository } from "./domain/repositories/ISiteSetting";
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
import { IGetAllProvidersWalletsUseCase } from "./application/use-case/wallet/getWallet/IGetAllProvidersWallets.usecase";
import { GetAllProvidersWallets } from "./application/use-case/wallet/getWallet/GetAllProvidersWallets.usecase";
import { IGetProviderWalletUseCase } from "./application/use-case/wallet/getWalletByid/IGetProviderWalletById.usecase";
import { WithdrawFromProviderWalletUseCase } from "./application/use-case/wallet/withdraw/WithdrawFromProviderWallet.usecase";
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

import { ManageServiceProviderSubscriptionsUseCase } from "./application/use-case/subscription/ManageServiceProviderSubscriptionsUseCase";
import { IManageServiceProviderSubscriptionsUseCase } from "./application/use-case/subscription/IManageServiceProviderSubscriptionsUseCase";
import { connect } from "http2";

import { AdRepository } from "./infrastructure/repositories/AdRepository";

import { IServiceRepository } from "./domain/repositories/IServiceRepository";

import { IAdminGetAdsUseCase } from "./application/use-case/ads/getAds/IAdminGetAds.usecase";

import { RecommendAdsUseCase } from "./application/use-case/User/Ads/recommendAds/RecommendAdsUseCase";
import { IExpireAdsUseCase } from "./application/use-case/ads/expireAds/ExpireAds.usecase";
import { IIncreaseAdClicksUseCase } from "./application/use-case/User/Ads/increaseAdclicks/IIncreaseAdClicksUseCase";
import { IncreaseAdClicksUseCase } from "./application/use-case/User/Ads/increaseAdclicks/IncreaseAdClicksUseCase";
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
import { GetBookedServicesUseCase } from "./application/use-case/booking/fetchBookings/GetBookedServices.usecase";
import { IGetBookedServicesUseCase } from "./application/use-case/booking/fetchBookings/IGetBookedServices.usecase";
import { IGetBookedServiceByIdUseCase } from "./application/use-case/booking/fetchByid/IGetBookedServiceById.usecase";
import { GetBookedServiceByIdUseCase } from "./application/use-case/booking/fetchByid/GetBookedServiceById.usecase";

import { IServiceBookingRepository } from "./domain/repositories/IserviceBookingRepository";
import { RescheduleOnlineServiceSlotUseCase } from "./application/use-case/booking/rescheduleOnlineService/RescheduleOnlineService.usecase";
import { IRescheduleOnlineServiceSlotUseCase } from "./application/use-case/booking/rescheduleOnlineService/IRescheduleOnlineService.usecase";
import { IGetServiceProviderRegistrationDetailsUseCase } from "./application/use-case/serviceProvider/auth/getServiceProviderRegistrationDetails/IGetServiceProviderRegistrationDetailsUseCase";
import { GetServiceProviderRegistrationDetailsUseCase } from "./application/use-case/serviceProvider/auth/getServiceProviderRegistrationDetails/GetServiceProviderRegistrationDetailsUseCase";
import { IGetServiceProviderStatusUseCase } from "./application/use-case/wallet/providerWallet/getServiceProviderStatus/IGetServiceProviderStatusUseCase";
import { GetServiceProviderStatusUseCase } from "./application/use-case/wallet/providerWallet/getServiceProviderStatus/GetServiceProviderStatusUseCase";
import { ReapplyServiceProviderUseCase } from "./application/use-case/serviceProvider/auth/ReapplyServiceProviderUseCase";
import { IReapplyServiceProviderUseCase } from "./application/use-case/serviceProvider/auth/IReapplyServiceProviderUseCase";
import { ITokenService } from "./services/token/ITokenService";
import { IRedisService } from "./services/redis/IRedisService";
import { ICloudinaryService } from "./services/cloudinary/ICloudinaryService";
import { ISmsOtpService } from "./services/otp/ISmsOtpService";
import { IOtpService } from "./services/otp/IOtpService";
import { IEmailService } from "./services/mailService/IEmailService";
import { ICleanupSlotsBeforeTodayUseCase } from "./application/use-case/slot/cleanUpSlots/ICleanupSlotsBeforeToday.usecase";
import { CleanupSlotsBeforeTodayUseCase } from "./application/use-case/slot/cleanUpSlots/CleanupSlotsBeforeToday.usecase";
import { ICreateSlotUseCase } from "./application/use-case/slot/createSlot/ICreateSlot.usecase";
import { CreateSlotUseCase } from "./application/use-case/slot/createSlot/CreateSlot.usecase";
import { IDeleteSlotUseCase } from "./application/use-case/slot/deleteSlot/IDeleteSlot.usecase";
import { IGetSlotUseCase } from "./application/use-case/slot/getSlots/IGetSlot.usecase";
import { DeleteSlotUseCase } from "./application/use-case/slot/deleteSlot/DeleteSlot.usecase";
import { GetSlotUseCase } from "./application/use-case/slot/getSlots/GetSlot.usecase";
import { IMarkSlotAsBookedUseCase } from "./application/use-case/slot/markAsBooked/IMarkSlotAsBooked.usecase";
import { MarkSlotAsBookedUseCase } from "./application/use-case/slot/markAsBooked/MarkSlotAsBooked.usecase";
import { ExpireAdsUseCase } from "./application/use-case/ads/expireAds/IExpireAds.usecase";
import { IChangeAdStatusUseCase } from "./application/use-case/ads/changeAdStatus/IChangeAdStatus.usecase";
import { ChangeAdStatusUseCase } from "./application/use-case/ads/changeAdStatus/ChangeAdStatus.usecase";
import { AdminGetAdsUseCase } from "./application/use-case/ads/getAds/AdminGetAds.usecase";

import { IWithdrawFromProviderWalletUseCase } from "./application/use-case/wallet/withdraw/IWithdrawFromProviderWallet.usecase";
import { GetProviderWalletUseCase } from "./application/use-case/wallet/getWalletByid/GetProviderWalletById.usecase";

import { ISaveMessageUseCase } from "./application/use-case/chat/saveMessage/ISaveMessage.uescase";
import { SaveMessageUseCase } from "./application/use-case/chat/saveMessage/SaveMessage.usecase";
import { GetAllChatsUseCase } from "./application/use-case/chat/getAllchats/GetAllChats.usecase";
import { IGetAllChats } from "./application/use-case/chat/getAllchats/IGetAllChats.usecase";
import { UploadChatImageUseCase } from "./application/use-case/chat/uploadChatMedia/UploadChatImage.usecase";
import { IUploadChatImageUseCase } from "./application/use-case/chat/uploadChatMedia/IUploadChatImage.usecase";

import { CreateNotificationUseCase } from "./application/use-case/notification/createNotification/CreateNotification.usecase";
import { GetNotificationUseCase } from "./application/use-case/notification/getNotification/GetNotification.usecase";
import { IMarkNotificationAsReadUseCase } from "./application/use-case/notification/markNotificationAsRead/IMarkNotificationAsRead.usecase";
import { MarkNotificationAsReadUseCase } from "./application/use-case/notification/markNotificationAsRead/MarkNotificationAsRead.usecase";
import { IDeleteSingleNotificationUseCase } from "./application/use-case/notification/deleteSingleNotification/IDeleteSingleNotification.usecase";
import { DeleteSingleNotificationUseCase } from "./application/use-case/notification/deleteSingleNotification/DeleteSingleNotification.usecase";
import { IDeleteAllNotificationUseCase } from "./application/use-case/notification/deleteAllNotification/IDeleteAllNotification.usecase";
import { DeleteAllNotificationUseCase } from "./application/use-case/notification/deleteAllNotification/DeleteAllNotification.usecase";
import { ICreateNotificationUseCase } from "./application/use-case/notification/createNotification/ICreateNotification.usecase";
import { IGetNotificationUseCase } from "./application/use-case/notification/getNotification/IGetNotification.usecase";
import { CreateAiChatUseCase } from "./application/use-case/aiAssistance/create/CreateAiChat.usecase";
import { ICreateAiChatUseCase } from "./application/use-case/aiAssistance/create/ICreateAiChat.usecase";
import { IGetAIChatByIdUseCase } from "./application/use-case/aiAssistance/getById/IGetAIChatByIdUseCase";
import { GetAIChatByIdUseCase } from "./application/use-case/aiAssistance/getById/GetAIChatByIdUseCase";
import { IGetProviderAIChatsUseCase } from "./application/use-case/aiAssistance/getByServiceProvidersId/IGetProviderAIChatsusecase";
import { GetProviderAIChatsUseCase } from "./application/use-case/aiAssistance/getByServiceProvidersId/GetProviderAIChats.usecase";
import { IGetAllSubscriptionPlansUseCase } from "./application/use-case/subscriptionManagement/getSubscription/IGetAllSubscriptionPlans.usecase";
import { GetAllSubscriptionPlansUseCase } from "./application/use-case/subscriptionManagement/getSubscription/GetAllSubscriptionPlans.usecase";
import { ICreateSubscriptionPlanUseCase } from "./application/use-case/subscriptionManagement/createSubscription/ICreateSubscriptionPlan.usecase";
import { CreateSubscriptionPlanUseCase } from "./application/use-case/subscriptionManagement/createSubscription/CreateSubscriptionPlan.usecase";
import { IUpdateSubscriptionPlanUseCase } from "./application/use-case/subscriptionManagement/updateSubscription/IUpdateSubscriptionPlan.usecase";
import { UpdateSubscriptionPlanUseCase } from "./application/use-case/subscriptionManagement/updateSubscription/UpdateSubscriptionPlan.usecase";
import { IEditAdUseCase } from "./application/use-case/ads/adsServiceProvider/editAd/IEditAd.usecase";
import { EditAdUseCase } from "./application/use-case/ads/adsServiceProvider/editAd/EditAd.usecase";
import { ICreateAdUseCase } from "./application/use-case/ads/adsServiceProvider/createAd/ICreateAd.usecase";
import { CreateAdUseCase } from "./application/use-case/ads/adsServiceProvider/createAd/CreateAd.usecase";
import { IGetProviderAdsUseCase } from "./application/use-case/ads/adsServiceProvider/getAd/IGetProviderAds.usecase";
import { GetProviderAdsUseCase } from "./application/use-case/ads/adsServiceProvider/getAd/GetProviderAds.usecase";
import { IGetServiceNamesUseCase } from "./application/use-case/service-management/serviceManagementAdmin/getServiceNames/IGetServiceNames.usecase";
import { GetServiceNamesUseCase } from "./application/use-case/service-management/serviceManagementAdmin/getServiceNames/GetServiceNames.usecases";
import { IGetAllUsers } from "./application/use-case/userManagement/getAllUsers/IGetAllUsers.usecase";
import { GetAllUsersUseCase } from "./application/use-case/userManagement/getAllUsers/GetAllUsers.usecase";
import { IBlockUnblockUsers } from "./application/use-case/userManagement/blockUnblockUsers/IBlockUnblockUsers.usecase";
import { BlockUnblockUsers } from "./application/use-case/userManagement/blockUnblockUsers/BlockUnblockUsers.usecase";
import { IGetServiceProviders } from "./application/use-case/serviceProviderManagement/getServiceProvider/IGetServiceProviders.usecase";
import { GetServiceProviders } from "./application/use-case/serviceProviderManagement/getServiceProvider/GetServiceProviders.usecase";
import { IGetAllServices } from "./application/use-case/service-management/serviceManagementAdmin/getService/IGetAllServices.usecase";
import { GetAllServices } from "./application/use-case/service-management/serviceManagementAdmin/getService/GetAllServices.usecase";
import { IBlockUnblockCategoryService } from "./application/use-case/category-management/blockUnblockService/IBlockUnblockCategoryService.usecase";
import { BlockUnblockCategoryService } from "./application/use-case/category-management/blockUnblockService/BlockUnblockCategoryService.usecase";
import { IBlockUnblockProviderUseCase } from "./application/use-case/serviceProviderManagement/blockServiceProvider/IBlockUnblockProvider.usecase";
import { BlockUnblockProviderUseCase } from "./application/use-case/serviceProviderManagement/blockServiceProvider/BlockUnblockProvider.usecase";
import { IBlockUnblockService } from "./application/use-case/service-management/serviceManagementAdmin/blockUnblock/IBlockUnblock.usecase";
import { BlockUnblockService } from "./application/use-case/service-management/serviceManagementAdmin/blockUnblock/BlockUnblock.usecase";
import { IAddCategory } from "./application/use-case/category-management/addCategoryy.ts/IAddCategory.usecase";
import { AddCategory } from "./application/use-case/category-management/addCategoryy.ts/AddCategory.usecase";
import { IGetCategory } from "./application/use-case/category-management/getCategory/IGetCategory.usecase";
import { GetCategory } from "./application/use-case/category-management/getCategory/GetCategory.usecase";
import { IEditCategory } from "./application/use-case/category-management/editCategory/IEditCategory.usecase";
import { EditCategory } from "./application/use-case/category-management/editCategory/EditCategory.usecase";
import { IBlockUnblockCategory } from "./application/use-case/category-management/blockUnblockCategory/IBlockUnblockCategory.usecase";
import { BlockUnblockCategory } from "./application/use-case/category-management/blockUnblockCategory/BlockUnblockCategory.usecase";
import { IDeleteCategory } from "./application/use-case/category-management/deleteCategory/IDeleteCategory.usecase";
import { IAddService } from "./application/use-case/category-management/addService/IAddService.usecase";
import { DeleteCategory } from "./application/use-case/category-management/deleteCategory/DeleteCategory.usecase";
import { AddService } from "./application/use-case/category-management/addService/AddService.usecase";
import { IDeleteService } from "./application/use-case/category-management/deleteService/IDeleteService.usecase";
import { DeleteService } from "./application/use-case/category-management/deleteService/DeleteService.usecase";
import { AddReviewUseCase } from "./application/use-case/review/addReview/AddReviewUseCase";
import { IAddReviewUseCase } from "./application/use-case/review/addReview/IAddReviewUseCase";
import { IDeleteAddress } from "./application/use-case/User/Address/deleteAddress/IDeleteAddress.usecase";
import { DeleteAddress } from "./application/use-case/User/Address/deleteAddress/DeleteAddress.usecase";
import { IAddNewAddress } from "./application/use-case/User/Address/addAddress/IAddNewAddress.usecase";
import { AddNewAddress } from "./application/use-case/User/Address/addAddress/AddNewAddress.usecase";
import { EditAddress } from "./application/use-case/User/Address/editAddress/EditAddress.usecase";
import { IEditAddress } from "./application/use-case/User/Address/editAddress/IEditAddress.usecase";
import { IGetAddress } from "./application/use-case/User/Address/getAddress/IGetAddress.usecase";
import { GetAddress } from "./application/use-case/User/Address/getAddress/GetAddress.usecase";
import { IRecommendAdsUseCase } from "./application/use-case/User/Ads/recommendAds/IRecommendAdsUseCase";
import { IResetPasswordUseCase } from "./application/use-case/User/auth/forgotPassword/resetPassword/IResetPassword.usecase";
import { ResetPasswordUseCase } from "./application/use-case/User/auth/forgotPassword/resetPassword/ResetPassword.usecase";
import { SendForgotPasswordOtpUseCase } from "./application/use-case/User/auth/forgotPassword/sendForgotPasswordOtp/SendForgotPasswordOtp.usecase";
import { ISendForgotPasswordOtpUseCase } from "./application/use-case/User/auth/forgotPassword/sendForgotPasswordOtp/ISendForgotPasswordOtp.usecase";
import { IVerifyForgotPasswordOtpUseCase } from "./application/use-case/User/auth/forgotPassword/verifyForgotPasswordOtp/IVerifyForgotPasswordOtp.usecase";
import { VerifyForgotPasswordOtpUseCase } from "./application/use-case/User/auth/forgotPassword/verifyForgotPasswordOtp/VerifyForgotPasswordOtp.usecase";
import { ISignInUseCase } from "./application/use-case/User/auth/signIn/ISignIn.usecase";
import { SignIn } from "./application/use-case/User/auth/signIn/SignIn.usecase";
import { ISignUpUseCase } from "./application/use-case/User/auth/signUp/ISignUp.usecase";
import { SignUpUseCase } from "./application/use-case/User/auth/signUp/SignUp.usecase";
import { IVerifyOtpUseCase } from "./application/use-case/User/auth/verifyOtp/IVerifyOtp.usecase";
import { IGoogleAuthUseCase } from "./application/use-case/User/auth/googleAuth/IGoogleAuth.usecase";
import { GoogleAuthUseCase } from "./application/use-case/User/auth/googleAuth/GoogleAuth.usecase";
import { IResendOtp } from "./application/use-case/User/auth/resendOtp/IResendOtp.usecase";
import { ResendOtp } from "./application/use-case/User/auth/resendOtp/ResendOtp.usecase";
import { VerifyOtp } from "./application/use-case/User/auth/verifyOtp/VerifyOtp.usecase.ts";
import { AdminSignin } from "./application/use-case/admin/auth/AdminSignin.usecase";
import { IAdminSignin } from "./application/use-case/admin/auth/IAdminSignin.usecase";
import { GetSingleServiceUseCase } from "./application/use-case/User/service/getSingleService/GetSingleServics.usecase";
import { GetAllActiveServiceUseCase } from "./application/use-case/User/service/getService/GetAllActiveService.usecase";
import { GetServiceProviderInfoUseCase } from "./application/use-case/User/service/getProviderInfo/GetServiceProviderInfo.usecase";
import { IGetAllActiveServiceUseCase } from "./application/use-case/User/service/getService/IGetAllActiveService.usecase";
import { IGetSingleServiceUseCase } from "./application/use-case/User/service/getSingleService/IGetSingleServics.usecase";
import { IProfileUpdateOtpUseCase } from "./application/use-case/User/profile/updateProfile/IProfileUpdateOtp.usecase";
import { ProfileUpdateOtpUseCase } from "./application/use-case/User/profile/updateProfile/ProfileUpdateOtp.usecase";
import { UserProfileUpdateUseCase } from "./application/use-case/User/profile/updateProfile/UserProfileUpdate.usecase";
import { IUserProfileUpdateUseCase } from "./application/use-case/User/profile/updateProfile/IUserProfileUpdate.usecase";
import { IGetUserProfileUseCase } from "./application/use-case/User/profile/getProfile/IGetUserProfile.usecase";
import { GetUserProfileUseCase } from "./application/use-case/User/profile/getProfile/GetUserProfile.usecase";
import { ICreateServiceOrderUseCase } from "./application/use-case/payment/CreateServiceOrderUseCase/ICreateServiceOrderUseCase";
import { CreateServiceOrderUseCase } from "./application/use-case/payment/CreateServiceOrderUseCase/CreateServiceOrderUseCase";
import { IFindAllActiveCouponsUseCase } from "./application/use-case/coupon/findAllActiveCoupons/IFindAllActiveCoupons.usecase";
import { FindAllActiveCouponsUseCase } from "./application/use-case/coupon/findAllActiveCoupons/FindAllActiveCoupons.usecase";
import { GetAdminProfileUseCase } from "./application/use-case/admin/profile/profile";
import { IGetAdminProfileUseCase } from "./application/use-case/admin/profile/IProfile";
import { GetPaymentInfoUseCase } from "./application/use-case/admin/dashboard/GetPaymentInfo.usecase";
import { IGetPaymentInfoUseCase } from "./application/use-case/admin/dashboard/IGetPaymentInfo.usecase";
import { IAdminSiteSettingsUseCase } from "./application/use-case/siteSetting/IAdminSiteSettings.usecase";
import { AdminSiteSettingsUseCase } from "./application/use-case/siteSetting/AdminSiteSettingsUseCase";
import { IServiceProviderRejectVerify } from "./application/use-case/serviceProviderManagement/rejectRequest/IServiceProviderReject.usecase";
import { ServiceProviderRejectVerify } from "./application/use-case/serviceProviderManagement/rejectRequest/ServiceProviderReject.usecase";
import { IManageAllServiceUseCase } from "./application/use-case/admin/dashboard/IManageAllService.usecase";
import { ManageAllServiceUseCase } from "./application/use-case/admin/dashboard/ManageAllService.usecase";
import { IEditServiceProviderProfileUseCase } from "./application/use-case/serviceProvider/IEditProfile";
import { EditServiceProviderProfileUseCase } from "./application/use-case/serviceProvider/EditProfile";
import { IGetPaymentInfoUseCaseServiceProvider } from "./application/use-case/serviceProvider/IGetPaymentInfoServiceProvider";
import { GetPaymentInfoUseCaseServiceProvider } from "./application/use-case/serviceProvider/GetPaymentInfoUseCaseServiceProvider";
import { ICheckServiceProviderAvailabilityUseCase } from "./application/use-case/serviceProvider/ICheckServiceProviderAvailability";
import { checkServiceProviderAvailabilityUseCase } from "./application/use-case/serviceProvider/checkServiceProviderAvailabilityUseCase";
import { IVerifyServiceProvider } from "./application/use-case/serviceProvider/IVerifyServiceProvider";
import { VerifyServiceProvider } from "./application/use-case/serviceProvider/VerifyServiceProvider";
import { IGetServiceProvider } from "./application/use-case/serviceProvider/auth/IGetServiceProvider";
import { GetServiceProvider } from "./application/use-case/serviceProvider/auth/getServiceProvider";
import { IAutoSuggestion } from "./application/use-case/User/location/IAutoSuggestion";
import { AutoSuggestion } from "./application/use-case/User/location/autoSuggestion";
import { IUserSiteSettings } from "./application/use-case/siteSetting/IUserSiteSettings";
import { UserSiteSettings } from "./application/use-case/siteSetting/UserSiteSettingsUseCase";
import { ILocationService } from "./services/location/ILocationService";
import { IGetServiceProviderInfoUseCase } from "./application/use-case/User/service/getProviderInfo/IGetServiceProviderInfo.usecase";

container.register<IUserRepository>(REPOSITORY_TOKENS.UserRepository, {
  useClass: MongoUserRepository,
});
container.register<IServiceProviderRepository>(
  REPOSITORY_TOKENS.ServiceProviderRepository,
  {
    useClass: ServiceProviderRepository,
  },
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
  },
);

container.register<IAiAssistanceRepository>(
  REPOSITORY_TOKENS.AiAssistanceRepository,
  {
    useClass: aiAssistanceRepository,
  },
);

container.register<IProviderWalletRepository>(
  REPOSITORY_TOKENS.WalletRepository,
  {
    useClass: ProviderWalletRepository,
  },
);

container.register<ICouponRepository>(REPOSITORY_TOKENS.CouponRepository, {
  useClass: CouponRepository,
});

container.registerSingleton<IEmailService>(
  SERVICE_TOKENS.EmailService,
  EmailService,
);

container.registerSingleton<IOtpService>(SERVICE_TOKENS.OtpService, Otpservice);

// container.register(ResendOtp, { useClass: ResendOtp });
// container.register(RegisterUser, { useClass: RegisterUser });
container.register<ITokenService>(SERVICE_TOKENS.TokenService, {
  useClass: TokenService,
});

container.registerSingleton<ICloudinaryService>(
  SERVICE_TOKENS.CloudinaryService,
  CloudinaryService,
);
container.registerSingleton("SocketService", SocketService);

container.register(VerifyOtp, { useClass: VerifyOtp });

container.register<ISmsOtpService>(SERVICE_TOKENS.SmsOtpService, {
  useClass: SmsOtpService,
});

container.register<IRedisService>(SERVICE_TOKENS.RedisService, {
  useClass: RedisService,
});

container.register<ILocationService>(SERVICE_TOKENS.LocationService, {
  useClass: LocationService,
});

container.register<IServiceRepository>(REPOSITORY_TOKENS.ServiceRepository, {
  useClass: ServiceRepository,
});

container.register<IServiceBookingRepository>(
  REPOSITORY_TOKENS.ServiceBookingRepository,
  {
    useClass: ServiceBookingRepository,
  },
);

container.register(SERVICE_TOKENS.RazorpayService, RazorpayService);

container.register("ReviewRepository", { useClass: ReviewRepository });
container.register("NotificationRepository", {
  useClass: NotificationRepository,
});

container.register<IChatRepository>(REPOSITORY_TOKENS.ChatRepository, {
  useClass: ChatRepository,
});

container.register<ISiteSettingRepository>(
  REPOSITORY_TOKENS.SiteSettingRepository,
  {
    useClass: SiteSettingRepository,
  },
);


container.register(REPOSITORY_TOKENS.AdRepository, AdRepository);

console.log("All dependencies registered successfully.");

container.register<ICreateCouponUseCase>(USE_CASE_TOKENS.CreateCouponUseCase, {
  useClass: CreateCouponUseCase,
});

container.register<IFindAllCouponsUseCase>(
  USE_CASE_TOKENS.FindAllCouponsUseCase,
  {
    useClass: FindAllCouponsUseCase,
  },
);

container.register<IMakeCouponInactiveUseCase>(
  USE_CASE_TOKENS.MakeCouponInactiveUseCase,
  {
    useClass: MakeCouponInactiveUseCase,
  },
);

container.register<IToggleShowInBannerUseCase>(
  USE_CASE_TOKENS.CouponshowInBanner,
  {
    useClass: ToggleShowInBannerUseCase,
  },
);

container.register<IFindFeaturedCouponsUseCase>(
  USE_CASE_TOKENS.FindFeaturedCouponsUseCase,
  {
    useClass: FindFeaturedCouponsUseCase,
  },
);

container.register<IApplyCouponToBookingUseCase>(
  USE_CASE_TOKENS.ApplyCouponToBookingUseCase,
  {
    useClass: ApplyCouponToBookingUseCase,
  },
);

container.register<IRemoveCouponToBookingUseCase>(
  USE_CASE_TOKENS.RemoveCouponToBookingUseCase,
  {
    useClass: RemoveCouponToBookingUseCase,
  },
);

container.register<IGetWalletUseCase>(USE_CASE_TOKENS.GetWalletUseCase, {
  useClass: GetWalletUseCase,
});

container.register<IWithdrawPaymentUseCase>(
  USE_CASE_TOKENS.WithdrawPaymentUseCase,
  {
    useClass: WithdrawPaymentUseCase,
  },
);

container.register<IGetAllProvidersWalletsUseCase>(
  USE_CASE_TOKENS.GetAllProvidersWallets,
  {
    useClass: GetAllProvidersWallets,
  },
);

container.register<IGetProviderWalletUseCase>(
  USE_CASE_TOKENS.GetProviderWalletByIdUseCase,
  {
    useClass: GetProviderWalletUseCase,
  },
);

container.register<IWithdrawFromProviderWalletUseCase>(
  USE_CASE_TOKENS.WithdrawFromProviderWalletUseCase,
  { useClass: WithdrawFromProviderWalletUseCase },
);

container.register<IGetSubscriptionPlansUseCase>(
  USE_CASE_TOKENS.GetSubscriptionPlansUseCase,
  {
    useClass: GetSubscriptionPlansUseCase,
  },
);

container.register<ICreatePaymentSubscriptionOrderUseCase>(
  USE_CASE_TOKENS.CreatePaymentSubscriptionOrderUseCase,
  {
    useClass: CreatePaymentSubscriptionOrderUseCase,
  },
);

container.register<ICreatePaymentSubscriptionOrderUseCase>(
  USE_CASE_TOKENS.CreatePaymentSubscriptionOrderUseCase,
  {
    useClass: CreatePaymentSubscriptionOrderUseCase,
  },
);

container.register<IVerifySubscriptionPaymentUseCase>(
  USE_CASE_TOKENS.VerifySubscriptionPaymentUseCase,
  {
    useClass: VerifySubscriptionPaymentUseCase,
  },
);

container.register<ICreateAiChatUseCase>(USE_CASE_TOKENS.CreateAiChatUseCase, {
  useClass: CreateAiChatUseCase,
});

container.register<IGetAIChatByIdUseCase>(
  USE_CASE_TOKENS.GetAIChatByIdUseCase,
  {
    useClass: GetAIChatByIdUseCase,
  },
);

container.register<IGetProviderAIChatsUseCase>(
  USE_CASE_TOKENS.GetProviderAIChatsUseCase,
  {
    useClass: GetProviderAIChatsUseCase,
  },
);

container.register<IManageServiceProviderSubscriptionsUseCase>(
  USE_CASE_TOKENS.ManageServiceProviderSubscriptionsUseCase,
  {
    useClass: ManageServiceProviderSubscriptionsUseCase,
  },
);

container.register<IGetAllSubscriptionPlansUseCase>(
  USE_CASE_TOKENS.GetAllSubscriptionPlansUseCase,
  {
    useClass: GetAllSubscriptionPlansUseCase,
  },
);

container.register<ICreateSubscriptionPlanUseCase>(
  USE_CASE_TOKENS.CreateSubscriptionPlanUseCase,
  {
    useClass: CreateSubscriptionPlanUseCase,
  },
);

container.register<IUpdateSubscriptionPlanUseCase>(
  USE_CASE_TOKENS.UpdateSubscriptionPlanUseCase,
  {
    useClass: UpdateSubscriptionPlanUseCase,
  },
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
  },
);

container.register<IAdminGetAdsUseCase>(USE_CASE_TOKENS.AdminGetAdsUseCase, {
  useClass: AdminGetAdsUseCase,
});

container.register<IGetServiceNamesUseCase>(
  USE_CASE_TOKENS.GetServiceNamesUseCase,
  {
    useClass: GetServiceNamesUseCase,
  },
);

container.register<IChangeAdStatusUseCase>(
  USE_CASE_TOKENS.ChangeAdStatusUseCase,
  {
    useClass: ChangeAdStatusUseCase,
  },
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
  },
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
  },
);

container.register<IConfirmBookingUseCase>(
  USE_CASE_TOKENS.ConfirmBookingUseCase,
  {
    useClass: ConfirmBookingUseCase,
  },
);

container.register<ICancelBookingUseCase>(
  USE_CASE_TOKENS.CancelBookingUseCase,
  {
    useClass: CancelBookingUseCase,
  },
);

container.register<IRequestPaymentUseCase>(
  USE_CASE_TOKENS.RequestPaymentUseCase,
  {
    useClass: RequestPaymentUseCase,
  },
);

container.register<ICreateBookingUseCase>(
  USE_CASE_TOKENS.CreateBookingUseCase,
  {
    useClass: CreateBookingUseCase,
  },
);

container.register<ICreateOnlineBookingUseCase>(
  USE_CASE_TOKENS.CreateOnlineBookingUseCase,
  {
    useClass: CreateOnlineBookingUseCase,
  },
);

container.register<IGetBookedServicesUseCase>(
  USE_CASE_TOKENS.GetBookedServicesUseCase,
  {
    useClass: GetBookedServicesUseCase,
  },
);

container.register<IGetBookedServiceByIdUseCase>(
  USE_CASE_TOKENS.GetBookedServiceByIdUseCase,
  {
    useClass: GetBookedServiceByIdUseCase,
  },
);

// container.register(USE_CASE_TOKENS.CleanupSlotsBeforeTodayUseCase, {
//   useClass: CleanupSlotsBeforeTodayUseCase,
// });

container.register<IMarkSlotAsBookedUseCase>(
  USE_CASE_TOKENS.MarkSlotAsBookedUseCase,
  {
    useClass: MarkSlotAsBookedUseCase,
  },
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
  },
);

container.register<IRescheduleOnlineServiceSlotUseCase>(
  USE_CASE_TOKENS.RescheduleOnlineServiceSlotUseCase,
  {
    useClass: RescheduleOnlineServiceSlotUseCase,
  },
);

container.register<IGetServiceProviderRegistrationDetailsUseCase>(
  USE_CASE_TOKENS.GetServiceProviderRegistrationDetailsUseCase,
  {
    useClass: GetServiceProviderRegistrationDetailsUseCase,
  },
);

container.register<IGetServiceProviderStatusUseCase>(
  USE_CASE_TOKENS.GetServiceProviderStatusUseCase,
  {
    useClass: GetServiceProviderStatusUseCase,
  },
);

container.register<IReapplyServiceProviderUseCase>(
  USE_CASE_TOKENS.ReapplyServiceProviderUseCase,
  {
    useClass: ReapplyServiceProviderUseCase,
  },
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
  },
);

container.register<IBlockUnblockProviderUseCase>(
  USE_CASE_TOKENS.BlockUnblockSericeProvider,
  {
    useClass: BlockUnblockProviderUseCase,
  },
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
  },
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

container.register<ISaveMessageUseCase>(USE_CASE_TOKENS.SaveMessageUseCase, {
  useClass: SaveMessageUseCase,
});

container.register<IGetAllChats>(USE_CASE_TOKENS.GetAllChatsUseCase, {
  useClass: GetAllChatsUseCase,
});

container.register<IUploadChatImageUseCase>(
  USE_CASE_TOKENS.UploadChatImageUseCase,
  {
    useClass: UploadChatImageUseCase,
  },
);

container.register<IAdminSignin>(USE_CASE_TOKENS.AdminSignin, {
  useClass: AdminSignin,
});

container.register<IGetNotificationUseCase>(
  USE_CASE_TOKENS.GetNotificationUseCase,
  {
    useClass: GetNotificationUseCase,
  },
);

container.register<ICreateNotificationUseCase>(
  USE_CASE_TOKENS.CreateNotificationUseCase,
  {
    useClass: CreateNotificationUseCase,
  },
);

container.register<IAddReviewUseCase>(USE_CASE_TOKENS.AddReviewUseCase, {
  useClass: AddReviewUseCase,
});

container.register<IMarkNotificationAsReadUseCase>(
  USE_CASE_TOKENS.MarkNotificationAsReadUseCase,
  {
    useClass: MarkNotificationAsReadUseCase,
  },
);

container.register<IDeleteSingleNotificationUseCase>(
  USE_CASE_TOKENS.DeleteSingleNotificationUseCase,
  {
    useClass: DeleteSingleNotificationUseCase,
  },
);

container.register<IDeleteAllNotificationUseCase>(
  USE_CASE_TOKENS.DeleteAllNotificationUseCase,
  {
    useClass: DeleteAllNotificationUseCase,
  },
);

container.register<IDeleteAddress>(USE_CASE_TOKENS.DeleteAddress, {
  useClass: DeleteAddress,
});

container.register<IAddNewAddress>(USE_CASE_TOKENS.AddNewAddress, {
  useClass: AddNewAddress,
});

container.register<IGetPaymentInfoUseCase>(
  USE_CASE_TOKENS.GetPaymentInfoUseCase,
  {
    useClass: GetPaymentInfoUseCase,
  },
);

container.register<IAdminSiteSettingsUseCase>(
  USE_CASE_TOKENS.AdminSiteSettingsUseCase,
  {
    useClass: AdminSiteSettingsUseCase,
  },
);

container.register<IServiceProviderRejectVerify>(
  USE_CASE_TOKENS.ServiceProviderRejectVerify,
  {
    useClass: ServiceProviderRejectVerify,
  },
);

container.register<IManageAllServiceUseCase>(
  USE_CASE_TOKENS.ManageAllServiceUseCase,
  {
    useClass: ManageAllServiceUseCase,
  },
);

container.register<IEditServiceProviderProfileUseCase>(
  USE_CASE_TOKENS.EditServiceProviderProfileUseCase,
  {
    useClass: EditServiceProviderProfileUseCase,
  },
);

container.register<IGetPaymentInfoUseCaseServiceProvider>(
  USE_CASE_TOKENS.GetPaymentInfoUseCaseServiceProvider,
  {
    useClass: GetPaymentInfoUseCaseServiceProvider,
  },
);

container.register<ICheckServiceProviderAvailabilityUseCase>(
  USE_CASE_TOKENS.CheckServiceProviderAvailabilityUseCase,
  {
    useClass: checkServiceProviderAvailabilityUseCase,
  },
);

container.register<IVerifyServiceProvider>(
  USE_CASE_TOKENS.VerifyServiceProvider,
  {
    useClass: VerifyServiceProvider,
  },
);

container.register<IGetServiceProvider>(
  USE_CASE_TOKENS.GetServiceProvider,
  {
    useClass: GetServiceProvider,
  },
);

container.register<IAutoSuggestion>(
  USE_CASE_TOKENS.AutoSuggestion,
  {
    useClass: AutoSuggestion,
  },
);

container.register<IUserSiteSettings>(
  USE_CASE_TOKENS.UserSiteSettings,
  {
    useClass: UserSiteSettings,
  },
);

container.register<IEditAddress>(USE_CASE_TOKENS.EditAddress, {
  useClass: EditAddress,
});

container.register<IGetAddress>(USE_CASE_TOKENS.GetAddress, {
  useClass: GetAddress,
});

container.register<IResetPasswordUseCase>(
  USE_CASE_TOKENS.ResetPasswordUseCase,
  {
    useClass: ResetPasswordUseCase,
  },
);

container.register<ISendForgotPasswordOtpUseCase>(
  USE_CASE_TOKENS.SendForgotPasswordOtpUseCase,
  {
    useClass: SendForgotPasswordOtpUseCase,
  },
);

container.register<IVerifyForgotPasswordOtpUseCase>(
  USE_CASE_TOKENS.VerifyForgotPasswordOtpUseCase,
  {
    useClass: VerifyForgotPasswordOtpUseCase,
  },
);

container.register<ISignInUseCase>(USE_CASE_TOKENS.SignInUseCase, {
  useClass: SignIn,
});

container.register<ISignUpUseCase>(USE_CASE_TOKENS.SignUpUseCase, {
  useClass: SignUpUseCase,
});

container.register<IVerifyOtpUseCase>(USE_CASE_TOKENS.VerifyOtpUseCase, {
  useClass: VerifyOtp,
});

container.register<IGoogleAuthUseCase>(USE_CASE_TOKENS.GoogleAuthUseCase, {
  useClass: GoogleAuthUseCase,
});

container.register<IResendOtp>(USE_CASE_TOKENS.ResendOtpUseCase, {
  useClass: ResendOtp,
});

container.register<IGetSingleServiceUseCase>(
  USE_CASE_TOKENS.GetSingleServiceUseCase,
  {
    useClass: GetSingleServiceUseCase,
  },
);

container.register<IGetAllActiveServiceUseCase>(
  USE_CASE_TOKENS.GetAllActiveServiceUseCase,
  {
    useClass: GetAllActiveServiceUseCase,
  },
);

container.register<IUserProfileUpdateUseCase>(
  USE_CASE_TOKENS.UserProfileUpdateUseCase,
  {
    useClass: UserProfileUpdateUseCase,
  },
);

container.register<IProfileUpdateOtpUseCase>(
  USE_CASE_TOKENS.ProfileUpdateOtpUseCase,
  {
    useClass: ProfileUpdateOtpUseCase,
  },
);

container.register<IGetUserProfileUseCase>(
  USE_CASE_TOKENS.GetUserProfileUseCase,
  {
    useClass: GetUserProfileUseCase,
  },
);

container.register<IGetServiceProviderInfoUseCase>(
  USE_CASE_TOKENS.GetServiceProviderInfoUseCase,
  {
    useClass: GetServiceProviderInfoUseCase,
  },
);

container.register<ICreateServiceOrderUseCase>(
  USE_CASE_TOKENS.CreateServiceOrderUseCase,
  {
    useClass: CreateServiceOrderUseCase,
  },
);

container.register<IFindAllActiveCouponsUseCase>(
  USE_CASE_TOKENS.FindAllActiveCouponsUseCase,
  {
    useClass: FindAllActiveCouponsUseCase,
  },
);


container.register<IGetAdminProfileUseCase>(
  USE_CASE_TOKENS.GetAdminProfileUseCase,
  {
    useClass: GetAdminProfileUseCase,
  },
);