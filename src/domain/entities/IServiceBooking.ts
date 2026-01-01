import { ObjectId } from "mongodb";
import { IAddress } from "./IAddress";
import { IPayment } from "./IPayment";
import { Types } from "mongoose";

export interface IServiceBooking {
  _id?: ObjectId;
  serviceProviderId: ObjectId;
  serviceId: ObjectId;
  address?: IAddress;
  serviceStatus?:
    | "pending"
    | "in-progress"
    | "completed"
    | "cancelled"
    | "confirmed";
  paymentType?: "cash" | "card" | "online" | "pending";
  paymentStatus: "pending" | "paid" | "failed" | "completed";
  userId: ObjectId;
  estimatedServiceTime?: Date;
  bookedTime?: Date;
  serviceCompletedTime?: Date;
  payment?: IPayment;
  cancelReason?: string;
  serviceBills?: string[];
  isOnlineService?: boolean;
  reviewId?: ObjectId;
  preferredSlot?: IPreferredServiceDateTime;
  liveLocation?: IliveLocation;
  serviceSlot?: IServiceSlot;
  bookingHistory?: IServiceBookingHistory[];
  coupon?: ICouponApplied;
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
