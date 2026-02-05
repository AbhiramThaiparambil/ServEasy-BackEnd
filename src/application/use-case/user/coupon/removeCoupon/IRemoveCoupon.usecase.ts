import { RemoveCouponRequestDTO, RemoveCouponResponseDTO } from "../../../../dtos/user/coupon/CouponDTO";

export interface IRemoveCouponToBookingUseCase {
  execute(data: RemoveCouponRequestDTO): Promise<RemoveCouponResponseDTO>;
}
