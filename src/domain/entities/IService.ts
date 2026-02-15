import { ISlot } from "./ISlot";

export interface ILocation {
  type: "Point";
  coordinates: [number, number];
  address: string;
}
export interface Review {
  userId: string;
  rating: number;
  comment?: string;
}

export interface IService {
  _id?: string;
  serviceName: string;
  description: string;
  serviceType: string;
  category: string;
  location: ILocation;
  estimatedPrice: number;
  serviceProviderId: string;
  isActive?: boolean;
  review?: Review[];
  serviceImage: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IOnlineService extends IService {
  slots: ISlot[] | [];
}