import { inject, injectable } from "tsyringe";
import { IApplyCouponToBookingUseCase } from "./IApplyCouponToBooking.usecase";
import { IServiceBookingRepository } from "../../../../../domain/repositories/IserviceBookingRepository";
import { ICouponRepository } from "../../../../../domain/repositories/IcouponRepository";
import { ServiceBookingRepository } from "../../../../../infrastructure/repositories/ServiceBookingRepository";

@injectable()
export class ApplyCouponToBookingUseCase
  implements IApplyCouponToBookingUseCase
{
  constructor(
    @inject(ServiceBookingRepository)
    private bookingRepo: IServiceBookingRepository,

    @inject("ICouponRepository")
    private couponRepo: ICouponRepository
  ) {}

  async execute({
    bookingId,
    couponCode,
  }: {
    bookingId: string;
    couponCode: string;
  }) {
    const booking = await this.bookingRepo.findById(bookingId);
    if (!booking || !booking.payment) throw new Error("Booking not found");

    const coupon = await this.couponRepo.findByCode(couponCode);
    if (!coupon || !coupon.isActive) {
      throw new Error("Invalid or inactive coupon");
    }

    const now = new Date();
    if (coupon.validFrom > now || coupon.validTo < now) {
      throw new Error("Coupon is not valid at this time");
    }

    if (
      coupon.minOrderAmount &&
      booking.payment.total < coupon.minOrderAmount
    ) {
      throw new Error(
        "Order total does not meet minimum requirement for this coupon"
      );
    }

    const alreadyUsed = await this.couponRepo.hasUserUsedCoupon(
      coupon.code,
      booking.userId.toString()
    );
    if (alreadyUsed) throw new Error("Coupon already used by this user");

    const discountAmount = coupon.discountValue;

    booking.coupon = {
      _id: coupon._id,
      code: coupon.code,
      discountAmount,
      appliedAt: new Date(),
    };

    booking.payment.discountAmount = discountAmount;
    booking.payment.finalTotal = booking.payment.total - discountAmount;

    const updatedBooking = await this.bookingRepo.update(bookingId, booking);

    await this.couponRepo.markUsedByUser(
      coupon.code,
      booking.userId.toString()
    );

    return updatedBooking?.payment;
  }
}
