import { Types } from 'mongoose';


export interface Location {
  address: string;
  latitude: number;
  longitude: number;
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
  category: string;
  location: Location;
  estimatedPrice: number;
  serviceProviderId: Types.ObjectId;
  isActive?: boolean;
  review?: Review[];
  serviceImage: string;
}
