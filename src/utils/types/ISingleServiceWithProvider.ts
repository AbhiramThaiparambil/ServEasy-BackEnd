export interface IServiceProviderDetails {
  _id: string;
  serviceProviderName: string;
  profileImage?: string;
  experience?: number;
  phone?: string;
  email?: string;
  isActive?: boolean;
}

export interface IServiceReviewDetails {
  avgRating: number;
  totalReviews: number;
}

export interface ISingleServiceWithProvider {
  _id: string;
  serviceName: string;
  description: string;
  serviceType: string;
  estimatedPrice: number;
  serviceImage?: string;
  isActive: boolean;
  serviceProviderId: string;
  createdAt: Date;
  updatedAt: Date;

  reviewDetails?: IServiceReviewDetails;
  serviceProviderDetails?: IServiceProviderDetails;
}
