
export const USE_CASE_TOKENS = {
  CreateCouponUseCase: 'ICreateCouponUseCase',
  FindAllCouponsUseCase: 'IFindAllCouponsUseCase',
  MakeCouponInactiveUseCase: 'IMakeCouponInactiveUseCase',
  CouponshowInBanner: 'ICouponshowInBannerUseCase',
  FindFeaturedCouponsUseCase: 'IFindFeaturedCouponsUseCase',
  ApplyCouponToBookingUseCase: 'IApplyCouponToBookingUseCase',
  RemoveCouponToBookingUseCase: 'IRemoveCouponToBookingUseCase',
  GetWalletUseCase: 'IGetWalletUseCase',
  WithdrawPaymentUseCase: 'IWithdrawPaymentUseCase',
  conformWithdrawPaymentUseCase: 'IConformWithdrawPaymentUseCase',
  GetAllProvidersWallets: 'IGetAllProvidersWallets',
  GetProviderWalletByIdUseCase: 'IGetProviderWalletUseCase',
  WithdrawFromProviderWalletUseCase: 'IWithdrawFromProviderWalletUseCase',
  GetSubscriptionPlansUseCase: 'IGetSubscriptionPlansUseCase',
  CreatePaymentSubscriptionOrderUseCase: 'ICreatePaymentSubscriptionOrderUseCase',
  VerifySubscriptionPaymentUseCase: 'IVerifySubscriptionPaymentUseCase',
  CreateAiChatUseCase: 'ICreateAiChatUseCase',
  GetAIChatByIdUseCase: 'IGetAIChatByIdUseCase',
  GetProviderAIChatsUseCase: 'IGetProviderAIChatsUseCase',
  ManageServiceProviderSubscriptionsUseCase:"IManageServiceProviderSubscriptionsUseCase",
  GetAllSubscriptionPlansUseCase:"IGetAllSubscriptionPlansUseCase",
  CreateSubscriptionPlanUseCase:"ICreateSubscriptionPlanUseCase",
  UpdateSubscriptionPlanUseCase:"IUpdateSubscriptionPlanUseCase",
  GetProviderAdsUseCase:"IGetProviderAdsUseCase",
EditAdUseCase:"IEditAdUseCase",
CreateAdUseCase:"ICreateAdUseCase",
GetServiceNamesUseCase:"IGetServiceNamesUseCase",
AdminGetAdsUseCase:"IAdminGetAdsUseCase",
ChangeAdStatusUseCase:"IChangeAdStatusUseCase"

};


export const REPOSITORY_TOKENS = {
  ServiceRepository:"ServiceRepository",
  WalletRepository: 'IWalletRepository',
  CouponRepository: 'ICouponRepository',
  SubscriptionRepository: 'ISubscriptionPlanRepository',
  AiAssistanceRepository: 'IAiAssistanceRepository',
  ServiceProviderRepository:"IServiceProviderRepository",
  AdRepository:"IAdRepository"


};
export const SERVICE_TOKENS = {
  MailService: 'IMailService',
  GoogleGenAIService: 'IGoogleGenAIService',
  CloudinaryService:"CloudinaryService"
};
