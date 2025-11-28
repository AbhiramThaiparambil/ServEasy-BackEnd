import { Types } from "mongoose";
import { ILocation } from "./IService";

export interface IAd {
  _id?: Types.ObjectId;

  serviceId: Types.ObjectId;
  providerId: Types.ObjectId;

  caption: string;
  description: string;
  image: string|null;

  targetLocation?: ILocation;

  radiusKm?: number;

  planType: 'basic' | 'pro' | 'premium';

  // Stats
  views?: number;
  clicks?: number;

  // Status
  status?: 'pending' | 'approved' | 'rejected' | 'expired';

  // Dates (stored as ISO strings on frontend)
  startDate?: Date;
  endDate?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}
