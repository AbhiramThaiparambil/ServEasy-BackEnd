import { IReview, IReviewWithUser } from "../entities/IReview";

export interface IReviewRepository {
  create(review: IReview): Promise<IReview>;
  findByServiceId(serviceId: string): Promise<IReview[]>;
  findByBookingId(bookingId: string): Promise<IReview | null>;
  findReviews(serviceId: string): Promise<IReviewWithUser[] | []>;
}
