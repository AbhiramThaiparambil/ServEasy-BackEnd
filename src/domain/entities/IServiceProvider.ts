import mongoose from "mongoose";
import { ISubscription } from "./ISubscription";
export interface ISkill {
  name: string;
  level: string;
}

export interface IBankDetails {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
}

export interface IServiceProvider {
  _id?: mongoose.Schema.Types.ObjectId;
  userId: mongoose.Schema.Types.ObjectId;
  serviceProviderName: string;
  serviceProviderEmail: string;
  serviceProviderPhone: string;
  subscription?: ISubscription[];
  experience: number;
  location: string;
  services: string[];
  skills: ISkill[];
  profileImage?: string;
  document?: string[];
  socialMedia?: string;
  businessType?: string;
  category?: string;
  subcategory?: string;
  description?: string;
  serviceMode?: string;
  isVerified?: "verified" | "pending" | "rejected";
  bankDetails: IBankDetails;
  isBlocked: boolean;
  createdAt?: Date;
}

export interface IUpdateProfile {
  _id: string;
  serviceProviderName: string;
  serviceProviderEmail: string;
  serviceProviderPhone: string;
  socialMedia: string;
  bankDetails: IBankDetails;
}

export interface IServiceProviderRegistration {
  serviceProviderName: string;
  serviceProviderEmail: string;
  serviceProviderPhone: string;
  experience: number;
  location: string;
  services: string[];
  skills: string[];
  serviceMode: string;
  profileImage: string;
  document: string[];
  businessType: string;
  category: string;
  subcategory: string;
  socialMedia: string;
  description?: string;
  userId: string;
  bankDetails: Partial<IBankDetails> | IBankDetails;
}
