import { injectable, inject } from "tsyringe";
import { IRemoveCouponToBookingUseCase } from "./IRemoveCoupon";
import { IServiceBookingRepository } from "../../../../domain/repositories/IserviceBookingRepository";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";
import { ICouponRepository } from "../../../../domain/repositories/IcouponRepository";
import { ServiceBookingRepository } from "../../../../infrastructure/repositories/ServiceBookingRepository";
@injectable()
export class RemoveCouponToBookingUseCase
  implements IRemoveCouponToBookingUseCase
{
  constructor(
    @inject(ServiceBookingRepository)
    private bookingRepository: IServiceBookingRepository,
    @inject(REPOSITORY_TOKENS.CouponRepository)
    private couponRepo: ICouponRepository
  ) {}

  async execute(bookingId: string): Promise<any> {
    const booking = await this.bookingRepository.findById(bookingId);
    if (!booking) {
      throw new Error("Booking not found");
    }

    if (!booking.coupon) {
      throw new Error("No coupon applied to this booking");
    }

    this.couponRepo.removeCoupon(booking.userId, booking.coupon._id + "");

    const updatedBooking =
      await this.bookingRepository.removeCouponAndUpdatePayment(bookingId);

    console.log(updatedBooking);

    return updatedBooking;
  }
}
