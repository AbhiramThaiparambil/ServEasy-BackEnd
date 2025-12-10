import { inject, injectable } from "tsyringe";
import { IExpireAdsUseCase } from "./ExpireAdsUseCase";
import { IAdRepository } from "../../../../domain/repositories/IAdRepository";


@injectable()
export class ExpireAdsUseCase implements IExpireAdsUseCase {
  
  constructor(
    @inject("AdsRepository")
    private adsRepository: IAdRepository
  ) {}

  async execute(): Promise<number> {
    return await this.adsRepository.expireExpiredAds();
  }
}
