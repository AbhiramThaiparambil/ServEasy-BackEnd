import { Types } from "mongoose";

export interface CreateSubscriptionPlanRequestDTO {
  name: string;
  price: number;
  validityDays: number;
  features: string[];
  adLimitPerMonth: number;
  payoutSpeedDays: number;
  description?: string;
}

export interface UpdateSubscriptionPlanRequestDTO {
  name?: string;
  price?: number;
  validityDays?: number;
  features?: string[];
  adLimitPerMonth?: number;
  payoutSpeedDays?: number;
  description?: string;
}

export interface SubscriptionPlanResponseDTO {
  _id: string; // Correctly using string for DTO response
  name: string;
  price: number;
  validityDays: number;
  features: string[];
  adLimitPerMonth: number;
  payoutSpeedDays: number;
  description?: string;
}
