import { injectable, inject } from "tsyringe";
import { IRemoveCouponToBookingUseCase } from "./IRemoveCoupon.usecase";
import { IServiceBookingRepository } from "../../../../../domain/repositories/IserviceBookingRepository";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { ICouponRepository } from "../../../../../domain/repositories/IcouponRepository";
import { ServiceBookingRepository } from "../../../../../infrastructure/repositories/ServiceBookingRepository";
import { RemoveCouponRequestDTO, RemoveCouponResponseDTO } from "../../../../dtos/user/coupon/CouponDTO";
import { getErrorMessage } from "../../../../../utils/errorUtils";


@injectable()
export class RemoveCouponToBookingUseCase implements IRemoveCouponToBookingUseCase {
  constructor(
    @inject(ServiceBookingRepository)
    private bookingRepository: IServiceBookingRepository,
    @inject(REPOSITORY_TOKENS.CouponRepository)
    private couponRepo: ICouponRepository
  ) {}

  async execute(data: RemoveCouponRequestDTO): Promise<RemoveCouponResponseDTO> {
    try {
      const { bookingId } = data;
      const booking = await this.bookingRepository.findById(bookingId);
      if (!booking) {
        throw new Error("Booking not found");
      }

      if (!booking.coupon) {
        throw new Error("No coupon applied to this booking");
      }

      await this.couponRepo.removeCoupon(booking.userId, booking.coupon._id + "");

      const updatedBooking = await this.bookingRepository.removeCouponAndUpdatePayment(
        bookingId
      );


      return {
        success: true,
        message: "Coupon removed successfully",
        discountAmount: updatedBooking?.payment?.discountAmount||0,
        finalAmount: updatedBooking?.payment?.finalTotal||0,

      };
    } catch (error: unknown) {
       return {
         success: false,
         message: getErrorMessage(error) || "Failed to remove coupon",
       }
    }
  }
}
