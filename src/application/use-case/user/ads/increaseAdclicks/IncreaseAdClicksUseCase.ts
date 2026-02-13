import { inject, injectable } from "tsyringe";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IAdRepository } from "../../../../../domain/repositories/IAdRepository";
import { IIncreaseAdClicksUseCase } from "./IIncreaseAdClicksUseCase";

import { IncreaseAdClicksRequestDTO } from "../../../../dtos/user/ads/increaseAdClicks/IncreaseAdClicksDTO";

@injectable()
export class IncreaseAdClicksUseCase implements IIncreaseAdClicksUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.AdRepository)
    private adsRepository: IAdRepository
  ) {}

  async execute(data: IncreaseAdClicksRequestDTO): Promise<number> {
    return await this.adsRepository.incrementClicks(data.adId);
  }
}
