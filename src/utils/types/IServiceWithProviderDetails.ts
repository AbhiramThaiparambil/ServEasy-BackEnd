import { IService } from "../../domain/entities/IService";
import { IServiceProvider } from "../../domain/entities/IServiceProvider";

export interface IServiceWithProviderDetails extends IService {
  serviceProviderDetails?: IServiceProvider | null;
  reviewDetails?: {
    avgRating: number;
    totalReviews: number;
  };
}
