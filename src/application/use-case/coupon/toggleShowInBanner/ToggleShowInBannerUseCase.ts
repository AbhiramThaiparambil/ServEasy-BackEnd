import { inject, injectable } from "tsyringe";
import { ICouponRepository } from "../../../../domain/repositories/IcouponRepository";
import { IToggleShowInBannerUseCase } from "./IToggleShowInBannerUseCase";

@injectable()
export class ToggleShowInBannerUseCase implements IToggleShowInBannerUseCase {
  constructor(
    @inject("ICouponRepository") private couponRepo: ICouponRepository
  ) {}

  async execute(id: string, show: boolean): Promise<void> {
    await this.couponRepo.updateCouponShowInBanner(id, show);
  }
}