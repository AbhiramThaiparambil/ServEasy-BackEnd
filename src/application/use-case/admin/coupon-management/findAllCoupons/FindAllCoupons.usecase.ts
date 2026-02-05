import { inject, injectable } from "tsyringe";
import { IFindAllCouponsUseCase } from "./IFindAllCoupons.usecase";
import { ICouponRepository } from "../../../../../domain/repositories/IcouponRepository";
import { CouponResponseDTO } from "../../../../dtos/admin/coupon/CouponResponseDTO";

@injectable()
export class FindAllCouponsUseCase implements IFindAllCouponsUseCase {
  constructor(
    @inject("ICouponRepository") private couponRepo: ICouponRepository
  ) {}

  async execute(): Promise<CouponResponseDTO[]> {
     const coupons= await this.couponRepo.findAllCoupons();
     return coupons.map((coupon) => ({
        ...coupon,
        showInBanner: coupon.showInBanner,
        isActive: coupon.isActive
     }));
  }
}
