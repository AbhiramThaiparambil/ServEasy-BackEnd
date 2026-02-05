import { Types } from "mongoose";

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
  location: Location;
  estimatedPrice: number;
  serviceProviderId: string;
  isActive?: boolean;
  // review?: Review[];
  serviceImage: string;
  serviceProviderDetails?: ServiceProviderDetailsDTO;
}
