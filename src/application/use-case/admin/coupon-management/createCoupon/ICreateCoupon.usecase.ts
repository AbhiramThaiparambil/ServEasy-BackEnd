import { CreateCouponDTO } from "../../../../dtos/admin/coupon/CreateCouponDTO";
import { CouponResponseDTO } from "../../../../dtos/admin/coupon/CouponResponseDTO";

export interface ICreateCouponUseCase {
  execute(coupon: CreateCouponDTO): Promise<CouponResponseDTO>;
}
