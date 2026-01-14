import { injectable, inject } from "tsyringe";
import {
  IBannerCouponResponse,
  ICoupon,
} from "../../../../domain/entities/ICoupon";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";
import { ICouponRepository } from "../../../../domain/repositories/IcouponRepository";
import { IFindFeaturedCouponsUseCase } from "./IFindFeaturedCouponsUseCase";

@injectable()
export class FindFeaturedCouponsUseCase implements IFindFeaturedCouponsUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.CouponRepository)
    private couponRepository: ICouponRepository
  ) {}

  async execute(skip: number): Promise<IBannerCouponResponse> {
    return await this.couponRepository.findFeaturedCoupons(skip);
  }
}
