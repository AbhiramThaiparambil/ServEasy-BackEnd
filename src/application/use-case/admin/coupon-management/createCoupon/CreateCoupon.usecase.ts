import { inject, injectable } from "tsyringe";
import { ICreateCouponUseCase } from "./ICreateCoupon.usecase";
import { ICouponRepository } from "../../../../../domain/repositories/IcouponRepository";
import { CreateCouponDTO } from "../../../../dtos/admin/coupon/CreateCouponDTO";
import { CouponResponseDTO } from "../../../../dtos/admin/coupon/CouponResponseDTO";
import { ICoupon } from "../../../../../domain/entities/ICoupon";

@injectable()
export class CreateCouponUseCase implements ICreateCouponUseCase {
  constructor(
    @inject("ICouponRepository") private couponRepo: ICouponRepository
  ) {}

  async execute(coupon: CreateCouponDTO): Promise<CouponResponseDTO> {
    const couponEntity: ICoupon = {
        ...coupon,
        usedBy: coupon.usedBy || [],
        showInBanner: coupon.showInBanner || false,
        isActive: coupon.isActive || true
    };
    const couponresponse = await this.couponRepo.createCoupon(couponEntity)
       return{
        ...couponresponse,
        showInBanner: couponresponse.showInBanner,
        isActive: couponresponse.isActive
       }
     
  }
}
