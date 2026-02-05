import { AddReviewRequestDTO, AddReviewResponseDTO } from "../../../../dtos/user/review/ReviewDTO";

export interface IAddReviewUseCase {
  execute(data: AddReviewRequestDTO): Promise<AddReviewResponseDTO>;
}
