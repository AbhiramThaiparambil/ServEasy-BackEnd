export const USE_CASE_TOKENS = {
  CreateCouponUseCase: 'ICreateCouponUseCase',
  FindAllCouponsUseCase: 'IFindAllCouponsUseCase',
  MakeCouponInactiveUseCase: 'IMakeCouponInactiveUseCase',
  CouponshowInBanner: 'ICouponshowInBannerUseCase',
  FindFeaturedCouponsUseCase:'IFindFeaturedCouponsUseCase',
  ApplyCouponToBookingUseCase:"IApplyCouponToBookingUseCase",
  RemoveCouponToBookingUseCase:"IRemoveCouponToBookingUseCase",
  GetWalletUseCase:"IGetWalletUseCase",
  WithdrawPaymentUseCase: "IWithdrawPaymentUseCase",
  conformWithdrawPaymentUseCase: "IConformWithdrawPaymentUseCase",
  GetAllProvidersWallets:"IGetAllProvidersWallets",
  GetProviderWalletByIdUseCase:"IGetProviderWalletUseCase",
  WithdrawFromProviderWalletUseCase:"IWithdrawFromProviderWalletUseCase"
};

export const REPOSITORY_TOKENS = {
  WalletRepository: 'IWalletRepository',
  CouponRepository: 'ICouponRepository',
};

export const SERVICE_TOKENS = {
  MailService: 'IMailService',
};
