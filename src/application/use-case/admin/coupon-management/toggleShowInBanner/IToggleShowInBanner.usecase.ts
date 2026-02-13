import { ToggleShowInBannerDTO } from "../../../../dtos/admin/coupon/ToggleShowInBannerDTO";

export interface IToggleShowInBannerUseCase {
  execute(data: ToggleShowInBannerDTO): Promise<void>;
}
