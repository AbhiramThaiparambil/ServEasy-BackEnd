import mongoose from "mongoose";
import {
  IServiceBooking,
  IPreferredServiceDateTime,
} from "../../../../domain/entities/IServiceBooking";

export interface ICreateOnlineBookingUseCase {
  execute(
    userId: mongoose.Types.ObjectId,
    serviceId: mongoose.Types.ObjectId,
    slotId: string
  ): Promise<IServiceBooking>;
}
