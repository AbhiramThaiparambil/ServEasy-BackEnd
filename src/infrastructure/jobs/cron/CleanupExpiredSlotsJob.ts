// services/jobs/CleanupExpiredSlotsJob.ts

import cron from "node-cron";
import { inject, injectable } from "tsyringe";
import { USE_CASE_TOKENS } from "../../../constants/tokens";
import { ICleanupSlotsBeforeTodayUseCase } from "../../../application/use-case/slot/cleanUpSlots/ICleanupSlotsBeforeToday.usecase";
@injectable()
export class CleanupExpiredSlotsJob {
  constructor(
    @inject(USE_CASE_TOKENS.CleanupSlotsBeforeTodayUseCase)
    private cleanupSlotsUseCase: ICleanupSlotsBeforeTodayUseCase,
  ) {
    // (async () => {
    //   console.log("Running slot cleanup (startup run)");
    //   await this.cleanupSlotsUseCase.execute();
    // })();
  }

  schedule(): void {
    cron.schedule(
      "0 0 * * *", // Every day at 12:00 AM
      async () => {
        try {
          console.log(" Running expired slot cleanup job");

          const deletedCount = await this.cleanupSlotsUseCase.execute();

          console.log(
            ` Expired slot cleanup completed. Deleted slots: ${deletedCount}`,
          );
        } catch (error) {
          console.error("❌ Expired slot cleanup job failed", error);
        }
      },
      {
        timezone: "Asia/Kolkata",
      },
    );
  }
}
