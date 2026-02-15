import { inject, injectable } from "tsyringe";
import { IApplyCouponToBookingUseCase } from "./IApplyCouponToBooking.usecase";
import { IServiceBookingRepository } from "../../../../../domain/repositories/IserviceBookingRepository";
import { ICouponRepository } from "../../../../../domain/repositories/IcouponRepository";

import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import {
  ApplyCouponRequestDTO,
  ApplyCouponResponseDTO,
} from "../../../../dtos/user/coupon/CouponDTO";
import { getErrorMessage } from "../../../../../utils/errorUtils";


@injectable()
export class ApplyCouponToBookingUseCase implements IApplyCouponToBookingUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ServiceBookingRepository)
    private bookingRepo: IServiceBookingRepository,

    @inject(REPOSITORY_TOKENS.CouponRepository)
    private couponRepo: ICouponRepository
  ) {}

 async execute(
    data: ApplyCouponRequestDTO
  ): Promise<ApplyCouponResponseDTO> {
    try {
      const { bookingId, couponCode } = data;

      const booking = await this.bookingRepo.findById(bookingId);

      if (!booking)
        throw new Error("Booking not found");

      if (!booking.payment)
        throw new Error("Booking payment not found");

      const coupon = await this.couponRepo.findByCode(couponCode);

      if (!coupon)
        throw new Error("Coupon not found");

      if (!coupon.isActive)
        throw new Error("Coupon is inactive");

      const now = new Date();

      if (coupon.validFrom > now || coupon.validTo < now)
        throw new Error("Coupon expired or not yet valid");

      const orderTotal = booking.payment.total;
      const discountValue = coupon.discountValue;

      if (!discountValue || discountValue <= 0)
        throw new Error("Invalid coupon discount");

      if (
        coupon.minOrderAmount &&
        orderTotal < coupon.minOrderAmount
      )
        throw new Error(
          `Minimum order amount is ₹${coupon.minOrderAmount}`
        );

      if (discountValue > orderTotal)
        throw new Error(
          "Discount cannot be greater than order total"
        );

      const alreadyUsed =
        await this.couponRepo.hasUserUsedCoupon(
          coupon.code,
          booking.userId.toString()
        );

      if (alreadyUsed)
        throw new Error("Coupon already used");

      const finalTotal = orderTotal - discountValue;

      booking.coupon = {
        _id: coupon._id,
        code: coupon.code,
        discountAmount: discountValue,
        appliedAt: new Date(),
      };

      booking.payment.discountAmount = discountValue;
      booking.payment.finalTotal = finalTotal;

      const updatedBooking =
        await this.bookingRepo.update(bookingId, booking);

      await this.couponRepo.markUsedByUser(
        coupon.code,
        booking.userId.toString()
      );

      return {
        success: true,
        discountAmount: discountValue,
        finalAmount: updatedBooking?.payment?.finalTotal ?? finalTotal,
        couponId: coupon._id?.toString(),
      };
    } catch (error: unknown) {
      return {
        success: false,
        message:
          getErrorMessage(error) ||
          "Failed to apply coupon",
      };
    }
  }
}
