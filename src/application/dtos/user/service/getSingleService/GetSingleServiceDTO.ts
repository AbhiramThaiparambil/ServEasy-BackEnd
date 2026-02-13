import { ISingleServiceWithProvider } from "../../../../../utils/types/ISingleServiceWithProvider";
import { IReviewWithUser } from "../../../../../domain/entities/IReview";

export interface GetSingleServiceRequestDTO {
  serviceId: string;
}

export interface GetSingleServiceResponseDTO {
  service: ISingleServiceWithProvider[];
  reviews: IReviewWithUser[];
}
