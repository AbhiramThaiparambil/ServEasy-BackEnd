import { ObjectId } from 'mongodb';
import { IAddress } from './IAddress';
import { IPayment } from './Ipayment';

export interface IServiceBooking {
    _id?: ObjectId;
    serviceProviderId:ObjectId;
    serviceId: ObjectId;
    address?: IAddress;
    serviceStatus?: 'pending' | 'in-progress' | 'completed' | 'cancelled'|'confirmed';
    paymentType?: 'cash' | 'card' | 'online'|'pending';
    paymentStatus: 'pending' | 'paid' | 'failed';
    userId: ObjectId;
    estimatedServiceTime?: Date;
    bookedTime?: Date;
    serviceCompletedTime?: Date;
    payment?:IPayment,
    cancelReason?:string,
    serviceBills?:string[]
    isOnlineService?:boolean
    reviewId?:ObjectId
    preferredSlot?:IPreferredServiceDateTime;
    liveLocation?:IliveLocation
    serviceSlot?:IServiceSlot
    bookingHistory?: IServiceBookingHistory[];

}
export interface IServiceSlot {
  date: Date;
  startTime: string;
  endTime: string;
}

export interface IServiceBookingHistory {
  bookingHistory: [
  {
    action: string;
    message: string;
    timestamp: Date;
  }
]
}

 export interface IliveLocation {
    lat: number;
    lng: number;
  };

  type TimeSlot = "morning" | "afternoon" | "anyTime";


export interface IPreferredServiceDateTime {
  date: Date;
  time: TimeSlot;
}
