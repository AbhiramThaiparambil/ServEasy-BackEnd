import { Types } from "mongoose";

export interface ISlot {
  _id?: string;
  serviceId:string|Types.ObjectId
  startTime: string;
  endTime: string;
  booked: boolean;
 createdAt?: Date;

}
