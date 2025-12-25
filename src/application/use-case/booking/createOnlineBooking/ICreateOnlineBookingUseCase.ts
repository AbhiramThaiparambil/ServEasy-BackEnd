import mongoose from "mongoose";
import {
  IServiceBooking,
  IPreferredServiceDateTime,
} from "../../../../domain/entities/IServiceBooking";

export interface ICreateOnlineBookingUseCase {
  execute(
    userId: mongoose.Types.ObjectId,
    serviceId: mongoose.Types.ObjectId,
    preferredServiceTime: IPreferredServiceDateTime,
    slotId: string
  ): Promise<IServiceBooking>;
}
