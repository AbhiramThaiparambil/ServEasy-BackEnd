import { injectable, inject } from "tsyringe";

import { Types } from "mongoose";
import { IAddReviewUseCase } from "./IAddReviewUseCase";
import { ReviewRepository } from "../../../../../infrastructure/repositories/ReviewRepository";
import { IReviewRepository } from "../../../../../domain/repositories/IReviewRepository";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IServiceBookingRepository } from "../../../../../domain/repositories/IserviceBookingRepository";

@injectable()
export class AddReviewUseCase implements IAddReviewUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.ReviewRepository)
    private reviewRepository: IReviewRepository,
    @inject(REPOSITORY_TOKENS.ServiceBookingRepository)
    private serviceBookingRepository: IServiceBookingRepository
  ) {}

  async execute(
    bookedServiceId: string,
    serviceId: string,
    rating: number,
    comment: string,
    userId: string
  ): Promise<void> {
    const review = await this.reviewRepository.create({
      userId: new Types.ObjectId(userId),
      bookingId: new Types.ObjectId(bookedServiceId),
      serviceId: new Types.ObjectId(serviceId),
      rating,
      comment,
    });

    if (!review || !review._id) {
      throw new Error("Failed to create review");
    }

    await this.serviceBookingRepository.updateReviewId(
      new Types.ObjectId(bookedServiceId),
      review._id
    );
  }
}
