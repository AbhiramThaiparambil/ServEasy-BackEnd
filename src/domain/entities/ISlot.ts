import { ObjectId, Types } from "mongoose";




export interface ISlot {
    _id?:string;
  serviceId:Types.ObjectId
  startTime: string;
  endTime: string;
  booked: boolean;
 createdAt?: Date;

}


