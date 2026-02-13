import cron from "node-cron";
import { USE_CASE_TOKENS } from "../../../constants/tokens";
import { inject, injectable } from "tsyringe";
import { IManageServiceProviderSubscriptionsUseCase } from "../../../application/use-case/serviceProvider/subscription/manageSubscription/IManageServiceProviderSubscriptionsUseCase";
@injectable()
export class SubscriptionCheckJob {
  constructor(
    @inject(USE_CASE_TOKENS.ManageServiceProviderSubscriptionsUseCase)
    private manageSubscriptionUseCase: IManageServiceProviderSubscriptionsUseCase
  ) {
    //    ( async () => {
    //                   console.log("Running subscription check... (first call,)");
    //     await this.manageSubscriptionUseCase.execute()})()
  }

  schedule() {
    cron.schedule("27 13 * * *", async () => {
      console.log(" Running subscription check... (test every second)");

      const result = await this.manageSubscriptionUseCase.execute();
      console.log(`Processed ${result.processedCount} subscriptions.`);
    });
  }
}
