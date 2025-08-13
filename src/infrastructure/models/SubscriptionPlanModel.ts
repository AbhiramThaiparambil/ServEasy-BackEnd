import mongoose, { Schema, Document, Types } from "mongoose";
import { ISubscriptionPlan } from "../../domain/entities/ISubscriptionPlan";

export interface ISubscriptionPlanDocument extends Omit<ISubscriptionPlan, "_id">, Document {
  _id: Types.ObjectId;
}
const SubscriptionPlanSchema = new Schema<ISubscriptionPlanDocument>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    validityDays: { type: Number, required: true },
    features: { type: [String], default: [] },
    adLimitPerMonth: { type: Number, default: 0 },
    payoutSpeedDays: { type: Number, default: 7 },
    description: { type: String }
  },
  { timestamps: true }
);

export const SubscriptionPlanModel = mongoose.model<ISubscriptionPlanDocument>(
  "SubscriptionPlan",
  SubscriptionPlanSchema
);
