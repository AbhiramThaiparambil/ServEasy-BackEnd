import { Types } from "mongoose";
import { ISlot } from "./ISlot";

export interface ILocation {
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
  _id?: Types.ObjectId;
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

export interface IOnlineService extends IService {
  slots: ISlot[] | [];
}