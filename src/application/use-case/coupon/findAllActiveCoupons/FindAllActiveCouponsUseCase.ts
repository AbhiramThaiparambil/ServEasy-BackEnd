import { inject, injectable } from "tsyringe";
import { ICoupon } from "../../../../domain/entities/ICoupon";
import { ICouponRepository } from "../../../../domain/repositories/IcouponRepository";
import { IFindAllActiveCouponsUseCase } from "./IFindAllActiveCouponsUseCase";

@injectable()
export class FindAllActiveCouponsUseCase implements IFindAllActiveCouponsUseCase {
  constructor(
    @inject("ICouponRepository") private couponRepo: ICouponRepository
  ) {}

  async execute(): Promise<ICoupon[]> {
    return await this.couponRepo.findAllActiveCoupons();
  }
}