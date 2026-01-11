import { Types } from "mongoose";
import { ILocation } from "./IService";

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

  status?: "active" | "block" | "expired";
  startDate?: Date;
  endDate?: Date;

  createdAt?: Date;
  updatedAt?: Date;
}
