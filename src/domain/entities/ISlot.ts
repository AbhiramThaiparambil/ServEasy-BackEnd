import { Types } from "mongoose";

export interface ISlot {
  _id?: Types.ObjectId | string;
  serviceId: Types.ObjectId;
  startTime: Date;
  endTime: Date;
  booked: boolean;
  createdAt?: Date;
}
