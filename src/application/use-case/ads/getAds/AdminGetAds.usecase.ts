import { injectable, inject } from "tsyringe";
import { IAdminGetAdsUseCase } from "./IAdminGetAds.usecase";
import { IAdRepository } from "../../../../domain/repositories/IAdRepository";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";
import { IAdminAd } from "../../../../utils/types/dto/IAdAdminDto";

@injectable()
export class AdminGetAdsUseCase implements IAdminGetAdsUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.AdRepository) private adRepository: IAdRepository
  ) {}

  async execute(
    skip: number,
    limit: number
  ): Promise<{ count: number; ads: IAdminAd[] }> {
    const ads = await this.adRepository.getAllAds(skip, limit);
    const count = await this.adRepository.getTotalAdCount();
    return { ads, count };
  }
}
