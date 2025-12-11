import { inject, injectable } from "tsyringe";
import { REPOSITORY_TOKENS } from "../../../../utils/constants/tokens";
import { IAdRepository } from "../../../../domain/repositories/IAdRepository";
import { IIncreaseAdClicksUseCase } from "./IIncreaseAdClicksUseCase";

@injectable()
export class IncreaseAdClicksUseCase implements IIncreaseAdClicksUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.AdRepository)
    private adsRepository: IAdRepository
  ) {}

  async execute(adId: string): Promise<number> {
    return await this.adsRepository.incrementClicks(adId);
  }
}
