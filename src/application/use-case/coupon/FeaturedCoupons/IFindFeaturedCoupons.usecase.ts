import { IBannerCouponResponse } from "../../../../domain/entities/ICoupon";

export interface IFindFeaturedCouponsUseCase {
  execute(skip:number): Promise<IBannerCouponResponse>;
}
