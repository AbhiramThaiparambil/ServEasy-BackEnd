import { Types } from "mongoose";
import { ILocation } from "./IService";
export type AdStatus = "active" | "block" | "expired";
export interface IAd {
  _id?: Types.ObjectId;

  serviceId: Types.ObjectId;
  providerId: Types.ObjectId;

  caption: string;
  description: string;
  image: string | null;

  targetLocation?: ILocation | null;

  radiusKm?: number;

  views?: number;
  clicks?: number;

  status?: AdStatus;
  startDate?: Date;
  endDate?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}
