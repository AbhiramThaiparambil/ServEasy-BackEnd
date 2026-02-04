export interface IRemoveCouponToBookingUseCase {
  execute( bookingId: string): Promise<any>;
}
