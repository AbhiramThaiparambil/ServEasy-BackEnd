import { GetAllActiveCouponsResponseDTO } from "../../../../dtos/user/coupon/CouponDTO";
export interface IFindAllActiveCouponsUseCase {
  execute(): Promise<GetAllActiveCouponsResponseDTO>;
}
