import {
  ApplyCouponRequestDTO,
  ApplyCouponResponseDTO,
} from "../../../../dtos/user/coupon/CouponDTO";

export interface IApplyCouponToBookingUseCase {
  execute(data: ApplyCouponRequestDTO): Promise<ApplyCouponResponseDTO>;
}
