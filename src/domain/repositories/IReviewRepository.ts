import { Types } from "mongoose";
import { IReview, IReviewWithUser } from "../entities/IReview";

export interface IReviewRepository {
  create(review: IReview): Promise<IReview>;
  findByServiceId(serviceId: Types.ObjectId): Promise<IReview[]>;
  findByBookingId(bookingId: Types.ObjectId): Promise<IReview | null>;
  findReviews(serviceId: Types.ObjectId): Promise<IReviewWithUser[] | []>;
}
