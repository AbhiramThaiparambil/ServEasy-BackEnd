import { inject, injectable } from "tsyringe";
import { ICoupon } from "../../../../../domain/entities/ICoupon";
import { ICouponRepository } from "../../../../../domain/repositories/IcouponRepository";
import { IFindAllActiveCouponsUseCase } from "./IFindAllActiveCoupons.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";

@injectable()
export class FindAllActiveCouponsUseCase
  implements IFindAllActiveCouponsUseCase
{
  constructor(
    @inject(REPOSITORY_TOKENS.CouponRepository)
    private couponRepo: ICouponRepository
  ) {}

  async execute(): Promise<ICoupon[]> {
    return await this.couponRepo.findAllActiveCoupons();
  }
}
