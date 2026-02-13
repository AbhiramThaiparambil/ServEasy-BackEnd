import { MakeCouponInactiveDTO } from "../../../../dtos/admin/coupon/MakeCouponInactiveDTO";

export interface IMakeCouponInactiveUseCase {
  execute(data: MakeCouponInactiveDTO): Promise<void>;
}
