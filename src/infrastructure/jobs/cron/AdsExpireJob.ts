import cron from "node-cron";
import { inject, injectable } from "tsyringe";
import { USE_CASE_TOKENS } from "../../../constants/tokens";
import { IExpireAdsUseCase } from "../../../application/use-case/admin/ads/expireAds/ExpireAds.usecase";

@injectable()
export class AdsExpireJob {
  constructor(
    @inject(USE_CASE_TOKENS.ExpireAdsUseCase)
    private expireAdsUseCase: IExpireAdsUseCase
  ) {}

  start() {
    cron.schedule("0 12 * * *", async () => {
      try {
        const result = await this.expireAdsUseCase.execute();
        if (result && result > 0) {
          console.log(`${result} ads expired`);
        }
      } catch (err) {
        console.error("Cron Error (Expire Ads):", err);
      }
    });

    console.log(" Ads Expire Cron Job Scheduled for 12:00 PM daily");
  }
}
