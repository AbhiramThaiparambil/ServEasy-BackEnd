import { IBannerCouponResponse, ICoupon } from "../../domain/entities/ICoupon";

export interface ICouponRepository {
  findAllCoupons(): Promise<ICoupon[]>;
  createCoupon(coupon: ICoupon): Promise<ICoupon>;
  makeCouponInactive(id: string): Promise<void>;
  toggleShowInBanner(id: string, show: boolean): Promise<void>;
  findAllActiveCoupons(): Promise<ICoupon[]>;
  updateCouponShowInBanner(id: string, action: boolean): Promise<boolean>;
  updateCouponStatus(id: string, action: boolean): Promise<boolean>;
  findFeaturedCoupons(skip: number): Promise<IBannerCouponResponse>;
  findByCode(code: string): Promise<ICoupon | null>;
  checkIsExceedMaxUseLimit(_id: string): Promise<boolean>;
  hasUserUsedCoupon(code: string, userId: string): Promise<boolean>;
  markUsedByUser(code: string, userId: string): Promise<void>;
  removeCoupon(userId: string, couponId: string): Promise<void>;
}
