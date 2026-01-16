import mongoose from "mongoose";

export interface IRescheduleOnlineServiceSlotUseCase {
  execute(
    serviceId: string,
    date: Date,
    startTime: Date,
    endTime: Date
  ): Promise<boolean>;
}
