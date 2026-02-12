import { Types } from "mongoose";
import { ILocation } from "../../../../domain/entities/IService";

export interface ServiceProviderDetailsDTO {
  _id: string;
  serviceProviderName: string;
  profileImage?: string;
  experience?: number;
  phone?: string;
  email?: string;
  isActive?: boolean;
  createdAt: Date;
}

export interface ServiceReviewDetailsDTO {
  avgRating: number;
  totalReviews: number;
}

export interface ServiceResponseDTO {

  _id: string;
  serviceName: string;
  description: string;
  serviceType: string;
  category: string;
  location: ILocation;
  estimatedPrice: number;
  serviceProviderId: string;
  isActive?: boolean;
  // review?: Review[];
  serviceImage: string;
  serviceProviderDetails?: ServiceProviderDetailsDTO;
}
