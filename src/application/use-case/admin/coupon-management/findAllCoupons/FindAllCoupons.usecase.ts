import { inject, injectable } from "tsyringe";
import { ICoupon } from "../../../../../domain/entities/ICoupon";
import { IFindAllCouponsUseCase } from "./IFindAllCoupons.usecase";
import { ICouponRepository } from "../../../../../domain/repositories/IcouponRepository";

@injectable()
export class FindAllCouponsUseCase implements IFindAllCouponsUseCase {
  constructor(
    @inject("ICouponRepository") private couponRepo: ICouponRepository
  ) {}

  async execute(): Promise<ICoupon[]> {
    return await this.couponRepo.findAllCoupons();
  }
}
