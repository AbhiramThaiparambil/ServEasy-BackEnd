
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
  ManageServiceProviderSubscriptionsUseCase:"IManageServiceProviderSubscriptionsUseCase"
};

export const REPOSITORY_TOKENS = {
  WalletRepository: 'IWalletRepository',
  CouponRepository: 'ICouponRepository',
  SubscriptionRepository: 'ISubscriptionPlanRepository',
  AiAssistanceRepository: 'IAiAssistanceRepository',
  ServiceProviderRepository:"IServiceProviderRepository"
};
export const SERVICE_TOKENS = {
  MailService: 'IMailService',
  GoogleGenAIService: 'IGoogleGenAIService',
};
