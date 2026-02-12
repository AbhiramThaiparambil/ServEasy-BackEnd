import { inject, injectable } from "tsyringe";
import { ICouponRepository } from "../../../../../domain/repositories/IcouponRepository";
import { IFindAllActiveCouponsUseCase } from "./IFindAllActiveCoupons.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";

import { GetAllActiveCouponsResponseDTO } from "../../../../dtos/user/coupon/CouponDTO";

@injectable()
export class FindAllActiveCouponsUseCase
  implements IFindAllActiveCouponsUseCase
{
  constructor(
    @inject(REPOSITORY_TOKENS.CouponRepository)
    private couponRepository: ICouponRepository
  ) {}

  async execute(): Promise<GetAllActiveCouponsResponseDTO> {
    const coupons = await this.couponRepository.findAllActiveCoupons();
    return { coupons };
  }
}
