import { Types } from "mongoose";

export interface ILocationDTO {
  type: "Point";
  coordinates: number[];
  address?: string | null;
}


export interface IAdDTO {
  _id: Types.ObjectId;
  serviceId: Types.ObjectId;
  providerId: Types.ObjectId;
  caption: string;
  description: string;
  startDate?: Date | null;
  endDate?: Date | null;
  targetLocation?: ILocationDTO | null; 
  createdAt: Date;
  updatedAt: Date;
}
