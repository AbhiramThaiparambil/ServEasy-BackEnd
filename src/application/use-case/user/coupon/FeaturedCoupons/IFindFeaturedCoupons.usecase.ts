import {
  GetFeaturedCouponsRequestDTO,
  GetFeaturedCouponsResponseDTO,
} from "../../../../dtos/user/coupon/CouponDTO";

export interface IFindFeaturedCouponsUseCase {
  execute(data: GetFeaturedCouponsRequestDTO): Promise<GetFeaturedCouponsResponseDTO>;
}
