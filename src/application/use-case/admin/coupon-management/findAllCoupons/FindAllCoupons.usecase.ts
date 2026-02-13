import { inject, injectable } from "tsyringe";
import { IFindAllCouponsUseCase } from "./IFindAllCoupons.usecase";
import { ICouponRepository } from "../../../../../domain/repositories/IcouponRepository";
import { CouponResponseDTO } from "../../../../dtos/admin/coupon/CouponResponseDTO";

@injectable()
export class FindAllCouponsUseCase implements IFindAllCouponsUseCase {
  constructor(
    @inject("ICouponRepository") private couponRepo: ICouponRepository,
  ) {}

  async execute(): Promise<CouponResponseDTO[]> {
    const coupons = await this.couponRepo.findAllCoupons();
    console.log(coupons);

    return coupons.map((coupon) => ({
      code: coupon.code,
      discountValue: coupon.discountValue,
      validFrom: coupon.validFrom,
      validTo: coupon.validTo,
      _id: coupon._id,
      createdAt: coupon.createdAt,
      description: coupon.description,
      minOrderAmount: coupon.minOrderAmount,
      updatedAt: coupon.updatedAt,
      usageLimit: coupon.usageLimit,
      usedCount: coupon.usedCount,
      showInBanner: coupon.showInBanner,
      isActive: coupon.isActive,
    }));
  }
}
