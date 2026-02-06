import { IAdDTO } from "../../../../../utils/types/dto/IAdDto";
import { GetProviderAdsRequestDTO } from "../../../../dtos/serviceProvider/ads/getAd/GetProviderAdsRequestDTO";

export interface IGetProviderAdsUseCase {
  execute(
    data: GetProviderAdsRequestDTO
  ): Promise<{ ads: IAdDTO[] | []; count: number }>;
}
