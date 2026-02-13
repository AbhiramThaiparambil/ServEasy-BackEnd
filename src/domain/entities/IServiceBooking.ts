import { Types } from "mongoose";
import { IAddress } from "./IAddress";
import { IPayment } from "./IPayment";

export interface IServiceBooking {
  _id?: Types.ObjectId;
  serviceProviderId: Types.ObjectId;
  serviceId: Types.ObjectId;
  address?: IAddress;
  serviceStatus?:
    | "pending"
    | "in-progress"
    | "completed"
    | "cancelled"
    | "confirmed";
  paymentType?: "cash" | "card" | "online" | "pending" | "wallet";
  paymentStatus: "pending" | "paid" | "failed" | "completed";
  userId: Types.ObjectId;
  estimatedServiceTime?: Date;
  bookedTime?: Date;
  serviceCompletedTime?: Date;
  payment?: IPayment;
  cancelReason?: string;
  serviceBills?: string[];
  isOnlineService?: boolean;
  reviewId?: Types.ObjectId;
  preferredSlot?: IPreferredServiceDateTime;
  liveLocation?: IliveLocation;
  serviceSlot?: IServiceSlot;
  bookingHistory?: IServiceBookingHistory[];
  coupon?: ICouponApplied;
  createdAt?:Date;
  updatedAt?:Date;
}

export interface ICouponApplied {
  _id?: string;
  code: string;
  discountAmount: number;
  appliedAt: Date;
}

export interface IServiceSlot {
  date: Date;
  startTime: Date;
  endTime: Date;
}

export interface IServiceBookingHistory {
  bookingHistory: [
    {
      action: string;
      message: string;
      timestamp: Date;
    }
  ];
}

export interface IliveLocation {
  lat: number;
  lng: number;
}

type TimeSlot = "morning" | "afternoon" | "anyTime";

export interface IPreferredServiceDateTime {
  date: Date;
  time: TimeSlot;
}

export interface IBookedServiceWithDetails {
  _id?: Types.ObjectId;
  serviceBookedAddress: IAddress;
  serviceStatus: string;
  paymentType: string;
  serviceName: string;
  serviceType: string;
  serviceImage: string;
  bookedTime: Date;
}
