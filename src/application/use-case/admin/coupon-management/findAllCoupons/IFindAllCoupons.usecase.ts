import { CouponResponseDTO } from "../../../../dtos/admin/coupon/CouponResponseDTO";

export interface IFindAllCouponsUseCase {
  execute(): Promise<CouponResponseDTO[]>;
}
