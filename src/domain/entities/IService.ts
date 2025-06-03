import { Types } from 'mongoose';

export interface Location {
  type: "Point";
  coordinates: [number, number];
  address: string;
} 
export interface Review {
  userId: Types.ObjectId;
  rating: number;
  comment?: string;
}

export interface IService {
  serviceName: string;
  description: string;
  serviceType: string;
  category: Types.ObjectId;
  location: any;
  estimatedPrice: number;
  serviceProviderId: Types.ObjectId;
  isActive?: boolean;
  review?: Review[];
  serviceImage: string;
}
