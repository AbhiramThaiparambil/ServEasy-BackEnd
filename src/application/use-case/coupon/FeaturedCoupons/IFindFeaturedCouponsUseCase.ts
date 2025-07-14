import { ICoupon } from "../../../../domain/entities/ICoupon";

export interface IFindFeaturedCouponsUseCase {
  execute(): Promise<ICoupon[]>;
}
