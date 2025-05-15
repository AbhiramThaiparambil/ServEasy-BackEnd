import { Types } from "mongoose";

export interface IReview {
    _id?:Types.ObjectId
  serviceId: Types.ObjectId;
  bookingId: Types.ObjectId;
  rating: number;
  comment: string;
}
