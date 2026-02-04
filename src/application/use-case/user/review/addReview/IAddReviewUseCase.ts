export interface IAddReviewUseCase {
  execute(
    bookedServiceId: string,
    serviceId: string,
    rating: number,
    comment: string,
    userId: string
  ): Promise<void>;
}
