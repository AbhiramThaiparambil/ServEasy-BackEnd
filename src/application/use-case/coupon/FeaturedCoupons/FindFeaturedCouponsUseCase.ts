import { injectable, inject } from "tsyringe";
import { ICoupon } from "../../../../domain/entities/ICoupon";
import { REPOSITORY_TOKENS } from "../../../../utils/constants/tokens";
import { ICouponRepository } from "../../../../domain/repositories/IcouponRepository";
import { IFindFeaturedCouponsUseCase } from "./IFindFeaturedCouponsUseCase";

@injectable()
export class FindFeaturedCouponsUseCase implements IFindFeaturedCouponsUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.CouponRepository)
    private couponRepository: ICouponRepository
  ) {}

  async execute(): Promise<ICoupon[]> {
    return await this.couponRepository.findFeaturedCoupons();
  }
}
