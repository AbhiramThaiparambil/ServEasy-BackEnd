import { inject, injectable } from "tsyringe";
import { IExpireAdsUseCase } from "./ExpireAds.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IAdRepository } from "../../../../../domain/repositories/IAdRepository";

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
