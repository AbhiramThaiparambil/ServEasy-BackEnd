import { Types } from "mongoose";

export interface IReview {
    _id?:Types.ObjectId
    userId: Types.ObjectId;
  serviceId: Types.ObjectId;
  bookingId: Types.ObjectId;
  rating: number;
  comment: string;
}

export interface IReviewWithUser {
  _id: string; 
  rating: number;
  comment: string;
  userProfile: string;
  userName: string;
}
