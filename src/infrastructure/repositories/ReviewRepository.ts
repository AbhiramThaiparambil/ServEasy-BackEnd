
import { Types } from "mongoose";
import { IReview } from "../../domain/entities/IReview";
import {IReviewRepository} from "../../domain/repositories/IReviewRepository"
import { ReviewModel } from "../models/ReviewModel"; 
import { injectable } from "tsyringe";

@injectable()
export class ReviewRepository implements IReviewRepository {
  async create(review: IReview): Promise<IReview> {
    const newReview = new ReviewModel(review);
    const savedReview = await newReview.save();
    return savedReview.toObject();
  }

  async findByServiceId(serviceId: Types.ObjectId): Promise<IReview[]> {
    return ReviewModel.find({ serviceId }).lean();
  }

  async findByBookingId(bookingId: Types.ObjectId): Promise<IReview | null> {
    return ReviewModel.findOne({ bookingId }).lean();
  }

}
