export interface IApplyCouponToBookingUseCase {
  execute(data: { bookingId: string; couponCode: string }): Promise<any>;
}
