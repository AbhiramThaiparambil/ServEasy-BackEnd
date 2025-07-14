import { ICoupon } from '../../domain/entities/ICoupon';

export interface ICouponRepository {
  findAllCoupons(): Promise<ICoupon[]>;
  createCoupon(coupon: ICoupon): Promise<ICoupon>;
  makeCouponInactive(id: string): Promise<void>;
  toggleShowInBanner(id: string, show: boolean): Promise<void>;
  findAllActiveCoupons(): Promise<ICoupon[]>;
  updateCouponShowInBanner(id: string, action: boolean): Promise<boolean>;
  updateCouponStatus(id: string, action: boolean): Promise<boolean>;
  findFeaturedCoupons(): Promise<ICoupon[]|[]>;
}
