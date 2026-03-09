"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const UserRepositoriey_1 = require("./infrastructure/repositories/UserRepositoriey");
const ServiceProviderRepository_1 = require("./infrastructure/repositories/ServiceProviderRepository");
const tsyringe_1 = require("tsyringe");
const MailService_1 = require("./services/mailService/MailService");
const OtpService_1 = require("./services/otp/OtpService");
const RedisService_1 = require("./services/redis/RedisService");
const SmsOtpService_1 = require("./services/otp/SmsOtpService");
const TokenService_1 = require("./services/token/TokenService");
const CloudinaryService_1 = require("./services/cloudinary/CloudinaryService");
const RegisterServiceProvider_1 = require("./application/use-case/serviceProvider/auth/RegisterServiceProvider");
const location_1 = require("./services/location/location");
const ServiceRepositorie_1 = require("./infrastructure/repositories/ServiceRepositorie");
const categoryRepository_1 = require("./infrastructure/repositories/categoryRepository");
const ServiceBookingRepository_1 = require("./infrastructure/repositories/ServiceBookingRepository");
const RazorpayService_1 = require("./services/payment/RazorpayService");
const ChatRepository_1 = require("./infrastructure/repositories/ChatRepository");
const ReviewRepository_1 = require("./infrastructure/repositories/ReviewRepository");
const NotificationRepository_1 = require("./infrastructure/repositories/NotificationRepository");
const SiteSettingRepository_1 = require("./infrastructure/repositories/SiteSettingRepository");
const SlotRepository_1 = require("./infrastructure/repositories/SlotRepository");
const SocketService_1 = require("./services/socket/SocketService");
const providerWalletRepository_1 = require("./infrastructure/repositories/providerWalletRepository");
const couponRepository_1 = require("./infrastructure/repositories/couponRepository");
const CreateCoupon_usecase_1 = require("./application/use-case/admin/coupon-management/createCoupon/CreateCoupon.usecase");
const FindAllCoupons_usecase_1 = require("./application/use-case/admin/coupon-management/findAllCoupons/FindAllCoupons.usecase");
const tokens_1 = require("./constants/tokens");
const MakeCouponInactive_usecase_1 = require("./application/use-case/admin/coupon-management/makeCouponInactive/MakeCouponInactive.usecase");
const ToggleShowInBanner_usecase_1 = require("./application/use-case/admin/coupon-management/toggleShowInBanner/ToggleShowInBanner.usecase");
const FindFeaturedCoupons_usecase_1 = require("./application/use-case/user/coupon/FeaturedCoupons/FindFeaturedCoupons.usecase");
const ApplyCouponToBooking_usecase_1 = require("./application/use-case/user/coupon/applyCoupon/ApplyCouponToBooking.usecase");
const RemoveCoupon_usecase_1 = require("./application/use-case/user/coupon/removeCoupon/RemoveCoupon.usecase");
const GetWalletUseCase_1 = require("./application/use-case/serviceProvider/wallet/getWallet/GetWalletUseCase");
const WithdrawPaymentUseCase_1 = require("./application/use-case/serviceProvider/wallet/withdrawPayment/WithdrawPaymentUseCase");
const GetAllProvidersWallets_usecase_1 = require("./application/use-case/admin/wallet-management/getWallet/GetAllProvidersWallets.usecase");
const WithdrawFromProviderWallet_usecase_1 = require("./application/use-case/admin/wallet-management/withdraw/WithdrawFromProviderWallet.usecase");
const SubscriptionPlanRepository_1 = require("./infrastructure/repositories/SubscriptionPlanRepository");
const CreatePaymentSubscriptionOrderUseCase_1 = require("./application/use-case/common/payment/CreatePaymentSubscriptionOrderUseCase");
const VerifySubscriptionPaymentUseCase_1 = require("./application/use-case/common/payment/VerifySubscriptionPaymentUseCase");
const GoogleGenAIService_1 = require("./services/aiAssistant/GoogleGenAIService");
const AiAssistanceRepository_1 = require("./infrastructure/repositories/AiAssistanceRepository");
const ManageServiceProviderSubscriptionsUseCase_1 = require("./application/use-case/serviceProvider/subscription/manageSubscription/ManageServiceProviderSubscriptionsUseCase");
const AdRepository_1 = require("./infrastructure/repositories/AdRepository");
const RecommendAdsUseCase_1 = require("./application/use-case/user/ads/recommendAds/RecommendAdsUseCase");
const IncreaseAdClicksUseCase_1 = require("./application/use-case/user/ads/increaseAdclicks/IncreaseAdClicksUseCase");
const UpdateBookingStatusUseCase_1 = require("./application/use-case/serviceProvider/booking/updateBookingStatus/UpdateBookingStatusUseCase");
const ConfirmBooking_usecase_1 = require("./application/use-case/serviceProvider/booking/confirmBooking/ConfirmBooking.usecase");
const CancelBooking_usecase_1 = require("./application/use-case/user/booking/cancelBooking/CancelBooking.usecase");
const RequestPaymentUseCase_1 = require("./application/use-case/serviceProvider/booking/requestPayment/RequestPaymentUseCase");
const CreateOnlineBooking_usecase_1 = require("./application/use-case/user/booking/createOnlineBooking/CreateOnlineBooking.usecase");
const CreateBooking_usecase_1 = require("./application/use-case/user/booking/createBooking/CreateBooking.usecase");
const GetBookedServices_usecase_1 = require("./application/use-case/common/booking/fetchBookings/GetBookedServices.usecase");
const GetBookedServiceById_usecase_1 = require("./application/use-case/common/booking/fetchByid/GetBookedServiceById.usecase");
const RescheduleOnlineService_usecase_1 = require("./application/use-case/serviceProvider/booking/rescheduleOnlineService/RescheduleOnlineService.usecase");
const GetServiceProviderRegistrationDetailsUseCase_1 = require("./application/use-case/serviceProvider/auth/getServiceProviderRegistrationDetails/GetServiceProviderRegistrationDetailsUseCase");
const GetServiceProviderStatusUseCase_1 = require("./application/use-case/serviceProvider/getServiceProviderStatus/GetServiceProviderStatusUseCase");
const ReapplyServiceProviderUseCase_1 = require("./application/use-case/serviceProvider/auth/ReapplyServiceProviderUseCase");
const CleanupSlotsBeforeToday_usecase_1 = require("./application/use-case/serviceProvider/slot/cleanUpSlots/CleanupSlotsBeforeToday.usecase");
const CreateSlot_usecase_1 = require("./application/use-case/serviceProvider/slot/createSlot/CreateSlot.usecase");
const DeleteSlot_usecase_1 = require("./application/use-case/serviceProvider/slot/deleteSlot/DeleteSlot.usecase");
const GetSlot_usecase_1 = require("./application/use-case/serviceProvider/slot/getSlots/GetSlot.usecase");
const AddNewService_usecase_1 = require("./application/use-case/serviceProvider/service-management/addNewService/AddNewService.usecase");
const GetServices_usecase_1 = require("./application/use-case/serviceProvider/service-management/getServices/GetServices.usecase");
const EditService_usecase_1 = require("./application/use-case/serviceProvider/service-management/editService/EditService.usecase");
const BlockUnblockService_usecase_1 = require("./application/use-case/serviceProvider/service-management/blockUnblockService/BlockUnblockService.usecase");
const MarkSlotAsBooked_usecase_1 = require("./application/use-case/serviceProvider/slot/markAsBooked/MarkSlotAsBooked.usecase");
const IExpireAds_usecase_1 = require("./application/use-case/ads/expireAds/IExpireAds.usecase");
const ChangeAdStatus_usecase_1 = require("./application/use-case/common/ads/changeAdStatus/ChangeAdStatus.usecase");
const AdminGetAds_usecase_1 = require("./application/use-case/admin/ad-management/getAds/AdminGetAds.usecase");
const GetProviderWalletById_usecase_1 = require("./application/use-case/admin/wallet-management/getWalletByid/GetProviderWalletById.usecase");
const SaveMessage_usecase_1 = require("./application/use-case/common/chat/saveMessage/SaveMessage.usecase");
const GetAllChats_usecase_1 = require("./application/use-case/common/chat/getAllchats/GetAllChats.usecase");
const UploadChatImage_usecase_1 = require("./application/use-case/common/chat/uploadChatMedia/UploadChatImage.usecase");
const CreateNotification_usecase_1 = require("./application/use-case/common/notification/createNotification/CreateNotification.usecase");
const GetNotification_usecase_1 = require("./application/use-case/common/notification/getNotification/GetNotification.usecase");
const MarkNotificationAsRead_usecase_1 = require("./application/use-case/common/notification/markNotificationAsRead/MarkNotificationAsRead.usecase");
const DeleteSingleNotification_usecase_1 = require("./application/use-case/common/notification/deleteSingleNotification/DeleteSingleNotification.usecase");
const DeleteAllNotification_usecase_1 = require("./application/use-case/common/notification/deleteAllNotification/DeleteAllNotification.usecase");
const CreateAiChat_usecase_1 = require("./application/use-case/serviceProvider/ai-assistance/create/CreateAiChat.usecase");
const GetAIChatByIdUseCase_1 = require("./application/use-case/serviceProvider/ai-assistance/getById/GetAIChatByIdUseCase");
const GetProviderAIChats_usecase_1 = require("./application/use-case/serviceProvider/ai-assistance/getByServiceProvidersId/GetProviderAIChats.usecase");
const GetAllSubscriptionPlans_usecase_1 = require("./application/use-case/admin/subscription-management/getSubscription/GetAllSubscriptionPlans.usecase");
const CreateSubscriptionPlan_usecase_1 = require("./application/use-case/admin/subscription-management/createSubscription/CreateSubscriptionPlan.usecase");
const UpdateSubscriptionPlan_usecase_1 = require("./application/use-case/admin/subscription-management/updateSubscription/UpdateSubscriptionPlan.usecase");
const EditAd_usecase_1 = require("./application/use-case/serviceProvider/ads/editAd/EditAd.usecase");
const CreateAd_usecase_1 = require("./application/use-case/serviceProvider/ads/createAd/CreateAd.usecase");
const GetProviderAds_usecase_1 = require("./application/use-case/serviceProvider/ads/getAd/GetProviderAds.usecase");
const GetServiceNames_usecases_1 = require("./application/use-case/serviceProvider/service-management/getServiceNames/GetServiceNames.usecases");
const GetAllUsers_usecase_1 = require("./application/use-case/admin/user-management/getAllUsers/GetAllUsers.usecase");
const BlockUnblockUsers_usecase_1 = require("./application/use-case/admin/user-management/blockUnblockUsers/BlockUnblockUsers.usecase");
const GetServiceProviders_usecase_1 = require("./application/use-case/admin/provider-management/getServiceProvider/GetServiceProviders.usecase");
const GetAllServices_usecase_1 = require("./application/use-case/admin/service-management/getService/GetAllServices.usecase");
const BlockUnblockCategoryService_usecase_1 = require("./application/use-case/admin/category-management/blockUnblockService/BlockUnblockCategoryService.usecase");
const BlockUnblockProvider_usecase_1 = require("./application/use-case/admin/provider-management/blockServiceProvider/BlockUnblockProvider.usecase");
const BlockUnblock_usecase_1 = require("./application/use-case/admin/service-management/blockUnblock/BlockUnblock.usecase");
const AddCategory_usecase_1 = require("./application/use-case/admin/category-management/addCategoryy.ts/AddCategory.usecase");
const GetCategory_usecase_1 = require("./application/use-case/common/category/getCategory/GetCategory.usecase");
const EditCategory_usecase_1 = require("./application/use-case/admin/category-management/editCategory/EditCategory.usecase");
const BlockUnblockCategory_usecase_1 = require("./application/use-case/admin/category-management/blockUnblockCategory/BlockUnblockCategory.usecase");
const DeleteCategory_usecase_1 = require("./application/use-case/admin/category-management/deleteCategory/DeleteCategory.usecase");
const AddService_usecase_1 = require("./application/use-case/admin/category-management/addService/AddService.usecase");
const DeleteService_usecase_1 = require("./application/use-case/admin/category-management/deleteService/DeleteService.usecase");
const AddReviewUseCase_1 = require("./application/use-case/user/review/addReview/AddReviewUseCase");
const DeleteAddress_usecase_1 = require("./application/use-case/user/address/deleteAddress/DeleteAddress.usecase");
const AddNewAddress_usecase_1 = require("./application/use-case/user/address/addAddress/AddNewAddress.usecase");
const EditAddress_usecase_1 = require("./application/use-case/user/address/editAddress/EditAddress.usecase");
const GetAddress_usecase_1 = require("./application/use-case/user/address/getAddress/GetAddress.usecase");
const ResetPassword_usecase_1 = require("./application/use-case/user/auth/forgotPassword/resetPassword/ResetPassword.usecase");
const SendForgotPasswordOtp_usecase_1 = require("./application/use-case/user/auth/forgotPassword/sendForgotPasswordOtp/SendForgotPasswordOtp.usecase");
const VerifyForgotPasswordOtp_usecase_1 = require("./application/use-case/user/auth/forgotPassword/verifyForgotPasswordOtp/VerifyForgotPasswordOtp.usecase");
const SignIn_usecase_1 = require("./application/use-case/user/auth/signIn/SignIn.usecase");
const SignUp_usecase_1 = require("./application/use-case/user/auth/signUp/SignUp.usecase");
const GoogleAuth_usecase_1 = require("./application/use-case/user/auth/googleAuth/GoogleAuth.usecase");
const ResendOtp_usecase_1 = require("./application/use-case/user/auth/resendOtp/ResendOtp.usecase");
const VerifyOtp_usecase_ts_1 = require("./application/use-case/user/auth/verifyOtp/VerifyOtp.usecase.ts");
const AdminSignin_usecase_1 = require("./application/use-case/admin/auth/AdminSignin.usecase");
const GetSingleServics_usecase_1 = require("./application/use-case/user/service/getSingleService/GetSingleServics.usecase");
const GetAllActiveService_usecase_1 = require("./application/use-case/user/service/getService/GetAllActiveService.usecase");
const GetServiceProviderInfo_usecase_1 = require("./application/use-case/user/service/getProviderInfo/GetServiceProviderInfo.usecase");
const ProfileUpdateOtp_usecase_1 = require("./application/use-case/user/profile/updateProfile/ProfileUpdateOtp.usecase");
const UserProfileUpdate_usecase_1 = require("./application/use-case/user/profile/updateProfile/UserProfileUpdate.usecase");
const GetUserProfile_usecase_1 = require("./application/use-case/user/profile/getProfile/GetUserProfile.usecase");
const CreateServiceOrderUseCase_1 = require("./application/use-case/common/payment/CreateServiceOrderUseCase/CreateServiceOrderUseCase");
const FindAllActiveCoupons_usecase_1 = require("./application/use-case/user/coupon/findAllActiveCoupons/FindAllActiveCoupons.usecase");
const profile_1 = require("./application/use-case/admin/profile/profile");
const GetPaymentInfo_usecase_1 = require("./application/use-case/admin/dashboard/GetPaymentInfo.usecase");
const ServiceProviderReject_usecase_1 = require("./application/use-case/admin/provider-management/rejectRequest/ServiceProviderReject.usecase");
const ManageAllService_usecase_1 = require("./application/use-case/admin/dashboard/ManageAllService.usecase");
const GetPaymentInfoUseCase_1 = require("./application/use-case/serviceProvider/payments/getPaymentInfo/GetPaymentInfoUseCase");
const CheckServiceProviderAvailabilityUseCase_1 = require("./application/use-case/serviceProvider/availability/checkAvailability/CheckServiceProviderAvailabilityUseCase");
const VerifyServiceProvider_1 = require("./application/use-case/serviceProvider/verification/verifyServiceProvider/VerifyServiceProvider");
const autoSuggestion_1 = require("./application/use-case/user/location/autoSuggestion");
const UploadBills_usecase_1 = require("./application/use-case/serviceProvider/booking/billing/UploadBills.usecase");
const VerifyPayment_usecase_1 = require("./application/use-case/common/payment/verifyPayment/VerifyPayment.usecase");
const GetSubscriptionPlansUseCase_1 = require("./application/use-case/serviceProvider/subscription/getSubscriptionPlans/GetSubscriptionPlansUseCase");
const AdminSiteSettingsUseCase_1 = require("./application/use-case/admin/site-settings/AdminSiteSettingsUseCase");
const UserSiteSettingsUseCase_1 = require("./application/use-case/user/site-settings/UserSiteSettingsUseCase");
const GetProviderVerificationDetails_usecase_1 = require("./application/use-case/admin/provider-management/getProviderVerificationDetails/GetProviderVerificationDetails.usecase");
const EditProfile_1 = require("./application/use-case/serviceProvider/profile/editProfile/EditProfile");
const GetServiceProvider_1 = require("./application/use-case/serviceProvider/profile/getProfile/GetServiceProvider");
const GetBookingPaymentSummaryUseCase_1 = require("./application/use-case/serviceProvider/booking/getBookingPaymentSummary/GetBookingPaymentSummaryUseCase");
const GetAdminBookingHistory_usecase_1 = require("./application/use-case/admin/bookings/GetAdminBookingHistory.usecase");
tsyringe_1.container.register(tokens_1.REPOSITORY_TOKENS.UserRepository, {
    useClass: UserRepositoriey_1.MongoUserRepository,
});
tsyringe_1.container.register(tokens_1.REPOSITORY_TOKENS.ServiceProviderRepository, {
    useClass: ServiceProviderRepository_1.ServiceProviderRepository,
});
-tsyringe_1.container.register(RegisterServiceProvider_1.RegisterServiceProviderUseCase, {
    useClass: RegisterServiceProvider_1.RegisterServiceProviderUseCase,
});
tsyringe_1.container.register(tokens_1.REPOSITORY_TOKENS.CategoryRepository, {
    useClass: categoryRepository_1.CategoryRepository,
});
tsyringe_1.container.register("ISlotRepository", {
    useClass: SlotRepository_1.SlotRepository,
});
// repository
tsyringe_1.container.register(tokens_1.REPOSITORY_TOKENS.SubscriptionRepository, {
    useClass: SubscriptionPlanRepository_1.SubscriptionPlanRepository,
});
tsyringe_1.container.register(tokens_1.REPOSITORY_TOKENS.AiAssistanceRepository, {
    useClass: AiAssistanceRepository_1.aiAssistanceRepository,
});
tsyringe_1.container.register(tokens_1.REPOSITORY_TOKENS.WalletRepository, {
    useClass: providerWalletRepository_1.ProviderWalletRepository,
});
tsyringe_1.container.register(tokens_1.REPOSITORY_TOKENS.CouponRepository, {
    useClass: couponRepository_1.CouponRepository,
});
tsyringe_1.container.registerSingleton(tokens_1.SERVICE_TOKENS.EmailService, MailService_1.EmailService);
tsyringe_1.container.registerSingleton(tokens_1.SERVICE_TOKENS.OtpService, OtpService_1.Otpservice);
// container.register(ResendOtp, { useClass: ResendOtp });
// container.register(RegisterUser, { useClass: RegisterUser });
tsyringe_1.container.register(tokens_1.SERVICE_TOKENS.TokenService, {
    useClass: TokenService_1.TokenService,
});
tsyringe_1.container.registerSingleton(tokens_1.SERVICE_TOKENS.CloudinaryService, CloudinaryService_1.CloudinaryService);
tsyringe_1.container.registerSingleton("SocketService", SocketService_1.SocketService);
tsyringe_1.container.register(VerifyOtp_usecase_ts_1.VerifyOtp, { useClass: VerifyOtp_usecase_ts_1.VerifyOtp });
tsyringe_1.container.register(tokens_1.SERVICE_TOKENS.SmsOtpService, {
    useClass: SmsOtpService_1.SmsOtpService,
});
tsyringe_1.container.register(tokens_1.SERVICE_TOKENS.RedisService, {
    useClass: RedisService_1.RedisService,
});
tsyringe_1.container.register(tokens_1.SERVICE_TOKENS.LocationService, {
    useClass: location_1.LocationService,
});
tsyringe_1.container.register(tokens_1.REPOSITORY_TOKENS.ServiceRepository, {
    useClass: ServiceRepositorie_1.ServiceRepository,
});
tsyringe_1.container.register(tokens_1.REPOSITORY_TOKENS.ServiceBookingRepository, {
    useClass: ServiceBookingRepository_1.ServiceBookingRepository,
});
tsyringe_1.container.register(tokens_1.SERVICE_TOKENS.RazorpayService, RazorpayService_1.RazorpayService);
tsyringe_1.container.register("ReviewRepository", { useClass: ReviewRepository_1.ReviewRepository });
tsyringe_1.container.register("NotificationRepository", {
    useClass: NotificationRepository_1.NotificationRepository,
});
tsyringe_1.container.register(tokens_1.REPOSITORY_TOKENS.ChatRepository, {
    useClass: ChatRepository_1.ChatRepository,
});
tsyringe_1.container.register(tokens_1.REPOSITORY_TOKENS.SiteSettingRepository, {
    useClass: SiteSettingRepository_1.SiteSettingRepository,
});
tsyringe_1.container.register(tokens_1.REPOSITORY_TOKENS.AdRepository, AdRepository_1.AdRepository);
console.log("All dependencies registered successfully.");
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.CreateCouponUseCase, {
    useClass: CreateCoupon_usecase_1.CreateCouponUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.FindAllCouponsUseCase, {
    useClass: FindAllCoupons_usecase_1.FindAllCouponsUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.MakeCouponInactiveUseCase, {
    useClass: MakeCouponInactive_usecase_1.MakeCouponInactiveUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.CouponshowInBanner, {
    useClass: ToggleShowInBanner_usecase_1.ToggleShowInBannerUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.FindFeaturedCouponsUseCase, {
    useClass: FindFeaturedCoupons_usecase_1.FindFeaturedCouponsUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.ApplyCouponToBookingUseCase, {
    useClass: ApplyCouponToBooking_usecase_1.ApplyCouponToBookingUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.RemoveCouponToBookingUseCase, {
    useClass: RemoveCoupon_usecase_1.RemoveCouponToBookingUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetWalletUseCase, {
    useClass: GetWalletUseCase_1.GetWalletUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.WithdrawPaymentUseCase, {
    useClass: WithdrawPaymentUseCase_1.WithdrawPaymentUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetAllProvidersWallets, {
    useClass: GetAllProvidersWallets_usecase_1.GetAllProvidersWallets,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetProviderWalletByIdUseCase, {
    useClass: GetProviderWalletById_usecase_1.GetProviderWalletUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.WithdrawFromProviderWalletUseCase, { useClass: WithdrawFromProviderWallet_usecase_1.WithdrawFromProviderWalletUseCase });
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetSubscriptionPlansUseCase, {
    useClass: GetSubscriptionPlansUseCase_1.GetSubscriptionPlansUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.CreatePaymentSubscriptionOrderUseCase, {
    useClass: CreatePaymentSubscriptionOrderUseCase_1.CreatePaymentSubscriptionOrderUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.CreatePaymentSubscriptionOrderUseCase, {
    useClass: CreatePaymentSubscriptionOrderUseCase_1.CreatePaymentSubscriptionOrderUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.VerifySubscriptionPaymentUseCase, {
    useClass: VerifySubscriptionPaymentUseCase_1.VerifySubscriptionPaymentUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.CreateAiChatUseCase, {
    useClass: CreateAiChat_usecase_1.CreateAiChatUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetAIChatByIdUseCase, {
    useClass: GetAIChatByIdUseCase_1.GetAIChatByIdUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetProviderAIChatsUseCase, {
    useClass: GetProviderAIChats_usecase_1.GetProviderAIChatsUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.ManageServiceProviderSubscriptionsUseCase, {
    useClass: ManageServiceProviderSubscriptionsUseCase_1.ManageServiceProviderSubscriptionsUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetAllSubscriptionPlansUseCase, {
    useClass: GetAllSubscriptionPlans_usecase_1.GetAllSubscriptionPlansUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.CreateSubscriptionPlanUseCase, {
    useClass: CreateSubscriptionPlan_usecase_1.CreateSubscriptionPlanUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.UpdateSubscriptionPlanUseCase, {
    useClass: UpdateSubscriptionPlan_usecase_1.UpdateSubscriptionPlanUseCase,
});
// ADS
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.EditAdUseCase, {
    useClass: EditAd_usecase_1.EditAdUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.CreateAdUseCase, {
    useClass: CreateAd_usecase_1.CreateAdUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetProviderAdsUseCase, {
    useClass: GetProviderAds_usecase_1.GetProviderAdsUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.AdminGetAdsUseCase, {
    useClass: AdminGetAds_usecase_1.AdminGetAdsUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetServiceNamesUseCase, {
    useClass: GetServiceNames_usecases_1.GetServiceNamesUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.ChangeAdStatusUseCase, {
    useClass: ChangeAdStatus_usecase_1.ChangeAdStatusUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.RecommendAdsUseCase, {
    useClass: RecommendAdsUseCase_1.RecommendAdsUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.ExpireAdsUseCase, {
    useClass: IExpireAds_usecase_1.ExpireAdsUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.IncreaseAdClicksUseCase, {
    useClass: IncreaseAdClicksUseCase_1.IncreaseAdClicksUseCase,
});
// services
tsyringe_1.container.register(tokens_1.SERVICE_TOKENS.GoogleGenAIService, {
    useClass: GoogleGenAIService_1.GoogleGenAIService,
});
// bookings
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.UpdateBookingStatusUseCase, {
    useClass: UpdateBookingStatusUseCase_1.UpdateBookingStatusUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.ConfirmBookingUseCase, {
    useClass: ConfirmBooking_usecase_1.ConfirmBookingUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.CancelBookingUseCase, {
    useClass: CancelBooking_usecase_1.CancelBookingUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.RequestPaymentUseCase, {
    useClass: RequestPaymentUseCase_1.RequestPaymentUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.CreateBookingUseCase, {
    useClass: CreateBooking_usecase_1.CreateBookingUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.CreateOnlineBookingUseCase, {
    useClass: CreateOnlineBooking_usecase_1.CreateOnlineBookingUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetBookedServicesUseCase, {
    useClass: GetBookedServices_usecase_1.GetBookedServicesUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetBookedServiceByIdUseCase, {
    useClass: GetBookedServiceById_usecase_1.GetBookedServiceByIdUseCase,
});
// container.register(USE_CASE_TOKENS.CleanupSlotsBeforeTodayUseCase, {
//   useClass: CleanupSlotsBeforeTodayUseCase,
// });
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.MarkSlotAsBookedUseCase, {
    useClass: MarkSlotAsBooked_usecase_1.MarkSlotAsBookedUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetSlotUseCase, {
    useClass: GetSlot_usecase_1.GetSlotUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.DeleteSlotUseCase, {
    useClass: DeleteSlot_usecase_1.DeleteSlotUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.CreateSlotUseCase, {
    useClass: CreateSlot_usecase_1.CreateSlotUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.CleanupSlotsBeforeTodayUseCase, {
    useClass: CleanupSlotsBeforeToday_usecase_1.CleanupSlotsBeforeTodayUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.RescheduleOnlineServiceSlotUseCase, {
    useClass: RescheduleOnlineService_usecase_1.RescheduleOnlineServiceSlotUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetServiceProviderRegistrationDetailsUseCase, {
    useClass: GetServiceProviderRegistrationDetailsUseCase_1.GetServiceProviderRegistrationDetailsUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetServiceProviderStatusUseCase, {
    useClass: GetServiceProviderStatusUseCase_1.GetServiceProviderStatusUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.ReapplyServiceProviderUseCase, {
    useClass: ReapplyServiceProviderUseCase_1.ReapplyServiceProviderUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetAllUsers, {
    useClass: GetAllUsers_usecase_1.GetAllUsersUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.BlockUnblockUsers, {
    useClass: BlockUnblockUsers_usecase_1.BlockUnblockUsers,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetServiceProviders, {
    useClass: GetServiceProviders_usecase_1.GetServiceProviders,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetAllServices, {
    useClass: GetAllServices_usecase_1.GetAllServices,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.BlockUnblockCategoryService, {
    useClass: BlockUnblockCategoryService_usecase_1.BlockUnblockCategoryService,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.BlockUnblockSericeProvider, {
    useClass: BlockUnblockProvider_usecase_1.BlockUnblockProviderUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.BlockUnblockService, {
    useClass: BlockUnblock_usecase_1.BlockUnblockService,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.AddCategory, {
    useClass: AddCategory_usecase_1.AddCategory,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetCategory, {
    useClass: GetCategory_usecase_1.GetCategoryUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.EditCategory, {
    useClass: EditCategory_usecase_1.EditCategory,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.BlockUnblockCategory, {
    useClass: BlockUnblockCategory_usecase_1.BlockUnblockCategory,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.DeleteCategory, {
    useClass: DeleteCategory_usecase_1.DeleteCategory,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.AddService, {
    useClass: AddService_usecase_1.AddService,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.DeleteService, {
    useClass: DeleteService_usecase_1.DeleteService,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.SaveMessageUseCase, {
    useClass: SaveMessage_usecase_1.SaveMessageUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetAllChatsUseCase, {
    useClass: GetAllChats_usecase_1.GetAllChatsUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.UploadChatImageUseCase, {
    useClass: UploadChatImage_usecase_1.UploadChatImageUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.AdminSignin, {
    useClass: AdminSignin_usecase_1.AdminSignin,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetBookingPaymentSummaryUseCase, {
    useClass: GetBookingPaymentSummaryUseCase_1.GetBookingPaymentSummaryUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetProviderVerificationDetailsUseCase, {
    useClass: GetProviderVerificationDetails_usecase_1.GetProviderVerificationDetailsUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetNotificationUseCase, {
    useClass: GetNotification_usecase_1.GetNotificationUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.CreateNotificationUseCase, {
    useClass: CreateNotification_usecase_1.CreateNotificationUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.AddReviewUseCase, {
    useClass: AddReviewUseCase_1.AddReviewUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.MarkNotificationAsReadUseCase, {
    useClass: MarkNotificationAsRead_usecase_1.MarkNotificationAsReadUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.DeleteSingleNotificationUseCase, {
    useClass: DeleteSingleNotification_usecase_1.DeleteSingleNotificationUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.DeleteAllNotificationUseCase, {
    useClass: DeleteAllNotification_usecase_1.DeleteAllNotificationUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.DeleteAddress, {
    useClass: DeleteAddress_usecase_1.DeleteAddress,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.AddNewAddress, {
    useClass: AddNewAddress_usecase_1.AddNewAddress,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetPaymentInfoUseCase, {
    useClass: GetPaymentInfo_usecase_1.GetPaymentInfoUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.AdminSiteSettingsUseCase, {
    useClass: AdminSiteSettingsUseCase_1.AdminSiteSettingsUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.ServiceProviderRejectVerify, {
    useClass: ServiceProviderReject_usecase_1.ServiceProviderRejectVerify,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.ManageAllServiceUseCase, {
    useClass: ManageAllService_usecase_1.ManageAllServiceUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.EditServiceProviderProfileUseCase, {
    useClass: EditProfile_1.EditServiceProviderProfileUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.ServiceProviderGetPaymentInfo, {
    useClass: GetPaymentInfoUseCase_1.GetPaymentInfoUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.CheckServiceProviderAvailability, {
    useClass: CheckServiceProviderAvailabilityUseCase_1.CheckServiceProviderAvailabilityUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.VerifyServiceProvider, {
    useClass: VerifyServiceProvider_1.VerifyServiceProvider,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetServiceProvider, {
    useClass: GetServiceProvider_1.GetServiceProvider,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.AutoSuggestion, {
    useClass: autoSuggestion_1.AutoSuggestion,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.UserSiteSettings, {
    useClass: UserSiteSettingsUseCase_1.UserSiteSettings,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.EditAddress, {
    useClass: EditAddress_usecase_1.EditAddress,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetAddress, {
    useClass: GetAddress_usecase_1.GetAddress,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.ResetPasswordUseCase, {
    useClass: ResetPassword_usecase_1.ResetPasswordUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.SendForgotPasswordOtpUseCase, {
    useClass: SendForgotPasswordOtp_usecase_1.SendForgotPasswordOtpUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.VerifyForgotPasswordOtpUseCase, {
    useClass: VerifyForgotPasswordOtp_usecase_1.VerifyForgotPasswordOtpUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.SignInUseCase, {
    useClass: SignIn_usecase_1.SignIn,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.SignUpUseCase, {
    useClass: SignUp_usecase_1.SignUpUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.VerifyOtpUseCase, {
    useClass: VerifyOtp_usecase_ts_1.VerifyOtp,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GoogleAuthUseCase, {
    useClass: GoogleAuth_usecase_1.GoogleAuthUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.ResendOtpUseCase, {
    useClass: ResendOtp_usecase_1.ResendOtp,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetSingleServiceUseCase, {
    useClass: GetSingleServics_usecase_1.GetSingleServiceUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetAllActiveServiceUseCase, {
    useClass: GetAllActiveService_usecase_1.GetAllActiveServiceUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.UserProfileUpdateUseCase, {
    useClass: UserProfileUpdate_usecase_1.UserProfileUpdateUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.ProfileUpdateOtpUseCase, {
    useClass: ProfileUpdateOtp_usecase_1.ProfileUpdateOtpUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetUserProfileUseCase, {
    useClass: GetUserProfile_usecase_1.GetUserProfileUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetServiceProviderInfoUseCase, {
    useClass: GetServiceProviderInfo_usecase_1.GetServiceProviderInfoUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.CreateServiceOrderUseCase, {
    useClass: CreateServiceOrderUseCase_1.CreateServiceOrderUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.FindAllActiveCouponsUseCase, {
    useClass: FindAllActiveCoupons_usecase_1.FindAllActiveCouponsUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetAdminProfileUseCase, {
    useClass: profile_1.GetAdminProfileUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.UploadBillsUseCase, {
    useClass: UploadBills_usecase_1.UploadBillsUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.AddNewService, {
    useClass: AddNewService_usecase_1.AddNewServiceUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetService, {
    useClass: GetServices_usecase_1.GetServicesUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.EditService, {
    useClass: EditService_usecase_1.EditServiceUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.BlockUnblockSericeUseCase, {
    useClass: BlockUnblockService_usecase_1.BlockUnblockServiceUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.VerifyPaymentUseCase, {
    useClass: VerifyPayment_usecase_1.VerifyPaymentUseCase,
});
tsyringe_1.container.register(tokens_1.USE_CASE_TOKENS.GetAdminBookingHistoryUseCase, {
    useClass: GetAdminBookingHistory_usecase_1.GetAdminBookingHistoryUseCase,
});
