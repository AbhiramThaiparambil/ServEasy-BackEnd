import { injectable, inject } from "tsyringe";
import { ServiceBookingRepository } from "../../../infrastructure/repositories/ServiceBookingRepository";
import { ReviewRepository } from "../../../infrastructure/repositories/ReviewRepository";
import { Types } from "mongoose";

@injectable()
export class AddReviewUseCase {
  constructor(
    @inject(ReviewRepository) private reviewRepository: ReviewRepository,
    @inject(ServiceBookingRepository)
    private serviceBookingRepository: ServiceBookingRepository
  ) {}

  async execute(
    bookedServiceId: string,
    serviceId: string,
    rating: number,
    comment: string,
    userId:string
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
