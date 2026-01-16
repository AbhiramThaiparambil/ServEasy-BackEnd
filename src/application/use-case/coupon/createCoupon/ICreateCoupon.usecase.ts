import { ICoupon } from '../../../../domain/entities/ICoupon';

export interface ICreateCouponUseCase {
  execute(coupon: ICoupon): Promise<ICoupon>;
}
