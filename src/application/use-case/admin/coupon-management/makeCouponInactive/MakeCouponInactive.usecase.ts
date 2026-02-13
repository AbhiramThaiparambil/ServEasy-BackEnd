import { inject, injectable } from "tsyringe";
import { ICouponRepository } from "../../../../../domain/repositories/IcouponRepository";
import { IMakeCouponInactiveUseCase } from "./IMakeCouponInactive.usecase";
import { MakeCouponInactiveDTO } from "../../../../dtos/admin/coupon/MakeCouponInactiveDTO";

@injectable()
export class MakeCouponInactiveUseCase implements IMakeCouponInactiveUseCase {
  constructor(
    @inject("ICouponRepository") private couponRepo: ICouponRepository,
  ) {}

  async execute(data: MakeCouponInactiveDTO): Promise<void> {
    const res = await this.couponRepo.updateCouponStatus(data.id, data.action);

    console.log(res);
    return;
  }
}
