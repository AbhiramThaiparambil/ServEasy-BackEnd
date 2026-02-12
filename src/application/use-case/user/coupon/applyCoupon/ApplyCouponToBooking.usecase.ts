import { inject, injectable } from "tsyringe";
import { IApplyCouponToBookingUseCase } from "./IApplyCouponToBooking.usecase";
import { IServiceBookingRepository } from "../../../../../domain/repositories/IserviceBookingRepository";
import { ICouponRepository } from "../../../../../domain/repositories/IcouponRepository";
import { ServiceBookingRepository } from "../../../../../infrastructure/repositories/ServiceBookingRepository";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import {
  ApplyCouponRequestDTO,
  ApplyCouponResponseDTO,
} from "../../../../dtos/user/coupon/CouponDTO";
import { getErrorMessage } from "../../../../../utils/errorUtils";


@injectable()
export class ApplyCouponToBookingUseCase implements IApplyCouponToBookingUseCase {
  constructor(
    @inject(ServiceBookingRepository)
    private bookingRepo: IServiceBookingRepository,

    @inject(REPOSITORY_TOKENS.CouponRepository)
    private couponRepo: ICouponRepository
  ) {}

  async execute(data: ApplyCouponRequestDTO): Promise<ApplyCouponResponseDTO> {
    try {
      const { bookingId, couponCode } = data;
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

      return {
        success: true,
        message: "Coupon applied successfully",
        discountAmount: discountAmount,
        finalAmount: updatedBooking?.payment?.finalTotal,
        couponId: coupon._id?.toString(),
      };
    } catch (error: unknown) {
      return {
        success: false,
        message: getErrorMessage(error) || "Failed to apply coupon",
      };
    }
  }
}
