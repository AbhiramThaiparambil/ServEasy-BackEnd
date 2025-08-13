import { Types } from "mongoose";

export interface ISubscriptionPlan {
  _id?: Types.ObjectId;
  name: string; 
  price: number;
  validityDays: number; 
  features: string[]; 
  adLimitPerMonth: number;
  payoutSpeedDays: number;
  description?: string;
}
