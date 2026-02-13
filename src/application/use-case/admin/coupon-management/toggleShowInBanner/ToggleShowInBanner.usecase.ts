import { inject, injectable } from "tsyringe";
import { ICouponRepository } from "../../../../../domain/repositories/IcouponRepository";
import { IToggleShowInBannerUseCase } from "./IToggleShowInBanner.usecase";
import { ToggleShowInBannerDTO } from "../../../../dtos/admin/coupon/ToggleShowInBannerDTO";

@injectable()
export class ToggleShowInBannerUseCase implements IToggleShowInBannerUseCase {
  constructor(
    @inject("ICouponRepository") private couponRepo: ICouponRepository
  ) {}

  async execute(data: ToggleShowInBannerDTO): Promise<void> {
    await this.couponRepo.updateCouponShowInBanner(data.id, data.show);
  }
}
