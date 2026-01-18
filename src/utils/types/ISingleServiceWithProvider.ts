import { Types } from "mongoose";

export interface IServiceProviderDetails {
  _id: Types.ObjectId;
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
  _id: Types.ObjectId;
  serviceName: string;
  description: string;
  serviceType: string;
  estimatedPrice: number;
  serviceImage?: string;
  isActive: boolean;
  serviceProviderId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;

  reviewDetails?: IServiceReviewDetails;
  serviceProviderDetails?: IServiceProviderDetails;
}
