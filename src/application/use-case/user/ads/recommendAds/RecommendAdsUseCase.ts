import { inject, injectable } from "tsyringe";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IRecommendAdsUseCase } from "./IRecommendAdsUseCase";
import { IAdRepository } from "../../../../../domain/repositories/IAdRepository";
import { IAd } from "../../../../../domain/entities/IAd";
import {
  GetRecommendedAdsRequestDTO,
  RecommendedAdDTO,
} from "../../../../dtos/user/ads/recommendAds/RecommendAdsDTO";

@injectable()
export class RecommendAdsUseCase implements IRecommendAdsUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.AdRepository)
    private adsRepository: IAdRepository
  ) {}

  async execute(
    data: GetRecommendedAdsRequestDTO
  ): Promise<RecommendedAdDTO[]> {
    const { count = 1, category, providerId, lat, lng, radius = 10000 } = data;

    return await this.adsRepository.findRecommendedAds({
      count,
      category,
      providerId,
      lat,
      lng,
      radius,
    });
  }
}
