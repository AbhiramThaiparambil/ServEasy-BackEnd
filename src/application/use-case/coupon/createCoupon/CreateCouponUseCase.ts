import { inject, injectable } from "tsyringe";
import { ICreateCouponUseCase } from "./ICreateCouponUseCase";
import { ICoupon } from "../../../../domain/entities/ICoupon";
import { ICouponRepository } from "../../../../domain/repositories/IcouponRepository";

@injectable()
export class CreateCouponUseCase implements ICreateCouponUseCase {
  constructor(
    @inject("ICouponRepository") private couponRepo: ICouponRepository
  ) {}

  async execute(coupon: ICoupon): Promise<ICoupon> {
    return await this.couponRepo.createCoupon(coupon);
  }
}