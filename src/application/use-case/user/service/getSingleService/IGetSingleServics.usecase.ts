import { IReviewWithUser } from "../../../../../domain/entities/IReview";
import { ISingleServiceWithProvider } from "../../../../../utils/types/ISingleServiceWithProvider";

export interface IGetSingleServiceUseCase {
  execute(serviceId: string): Promise<{
    service: ISingleServiceWithProvider[];
    reviews: IReviewWithUser[];
  }>;
}
