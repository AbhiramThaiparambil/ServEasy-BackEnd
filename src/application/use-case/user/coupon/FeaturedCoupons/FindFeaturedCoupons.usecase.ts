import { injectable, inject } from "tsyringe";
import {
  IBannerCouponResponse,
  ICoupon,
} from "../../../../../domain/entities/ICoupon";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { ICouponRepository } from "../../../../../domain/repositories/IcouponRepository";
import { IFindFeaturedCouponsUseCase } from "./IFindFeaturedCoupons.usecase";

import {
  GetFeaturedCouponsRequestDTO,
  GetFeaturedCouponsResponseDTO,
} from "../../../../dtos/user/coupon/CouponDTO";

@injectable()
export class FindFeaturedCouponsUseCase implements IFindFeaturedCouponsUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.CouponRepository)
    private couponRepository: ICouponRepository
  ) {}

  async execute(
    data: GetFeaturedCouponsRequestDTO
  ): Promise<GetFeaturedCouponsResponseDTO> {
    const { skip } = data;
    const result = await this.couponRepository.findFeaturedCoupons(skip);
    return result;
  }
}
