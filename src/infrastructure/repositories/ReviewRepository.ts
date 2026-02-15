
import { Types } from "mongoose";
import { IReview, IReviewWithUser } from "../../domain/entities/IReview";
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

  async findByServiceId(serviceId: string): Promise<IReview[]> {
    return ReviewModel.find({ serviceId }).lean();
  }

  async findByBookingId(bookingId: string): Promise<IReview | null> {
    return ReviewModel.findOne({ bookingId }).lean();
  }

  findReviews(serviceId: string): Promise<IReviewWithUser[]|[]> {
   return ReviewModel.aggregate([
      {
        $match: { serviceId: new Types.ObjectId(serviceId) }
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      {
        $unwind: "$userDetails"
      },
      {
        $project: {
          _id: 1,
          rating: 1,
          comment: 1,
          userProfile:"$userDetails.profileImage",
          userName: "$userDetails.userName",
        }
      }
    ])
  }

}
