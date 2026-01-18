import { inject, injectable } from "tsyringe";
import { ICouponRepository } from "../../../../domain/repositories/IcouponRepository";
import { IMakeCouponInactiveUseCase } from "./IMakeCouponInactive.usecase";

@injectable()
export class MakeCouponInactiveUseCase implements IMakeCouponInactiveUseCase {
  constructor(
    @inject("ICouponRepository") private couponRepo: ICouponRepository,
  ) {}

  async execute(id: string, action: boolean): Promise<void> {
    const res = await this.couponRepo.updateCouponStatus(id, action);

    console.log(res);
    return;
  }
}
