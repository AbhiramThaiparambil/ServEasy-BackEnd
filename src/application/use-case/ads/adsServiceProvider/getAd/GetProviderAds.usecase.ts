import { injectable, inject } from "tsyringe";

import { IGetProviderAdsUseCase } from "./IGetProviderAds.usecase";
import { IAdDTO } from "../../../../../utils/types/dto/IAdDto";
import { IAdRepository } from "../../../../../domain/repositories/IAdRepository";
@injectable()
export class GetProviderAdsUseCase implements IGetProviderAdsUseCase {
  constructor(@inject("IAdRepository") private adRepository: IAdRepository) {}

  async execute(
    providerId: string,
    skip?: number,
    limit?: number
  ): Promise<{ ads: IAdDTO[] | []; count: number }> {
    const ads = await this.adRepository.getAdsByProvider(
      providerId,
      skip,
      limit
    );
    const count = await this.adRepository.getTotalProviderAdCount(providerId);
    return { ads, count };
  }
}
