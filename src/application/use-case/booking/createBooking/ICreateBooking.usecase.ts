import mongoose from "mongoose";
import {
  IServiceBooking,
  IPreferredServiceDateTime,
  IliveLocation,
} from "../../../../domain/entities/IServiceBooking";
import { IAddress } from "../../../../domain/entities/IAddress";

export interface ICreateBookingUseCase {
  execute(
    userId: mongoose.Types.ObjectId,
    serviceId: mongoose.Types.ObjectId,
    address: IAddress,
    preferredServiceTime: IPreferredServiceDateTime,
    liveLocation?: IliveLocation,
  ): Promise<IServiceBooking>;
}
