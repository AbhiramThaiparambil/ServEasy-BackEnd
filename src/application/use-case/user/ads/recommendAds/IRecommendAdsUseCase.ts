import {
  GetRecommendedAdsRequestDTO,
  RecommendedAdDTO,
} from "../../../../dtos/user/ads/recommendAds/RecommendAdsDTO";

export interface IRecommendAdsUseCase {
  execute(data: GetRecommendedAdsRequestDTO): Promise<RecommendedAdDTO[]>;
}
