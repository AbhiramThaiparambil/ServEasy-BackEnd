import { inject, injectable } from "tsyringe";
import { IExpireAdsUseCase } from "./ExpireAdsUseCase";
import { IAdRepository } from "../../../../domain/repositories/IAdRepository";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";

@injectable()
export class ExpireAdsUseCase implements IExpireAdsUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.AdRepository)
    private adsRepository: IAdRepository
  ) {}

  async execute(): Promise<number> {
    return await this.adsRepository.expireExpiredAds();
  }
}
