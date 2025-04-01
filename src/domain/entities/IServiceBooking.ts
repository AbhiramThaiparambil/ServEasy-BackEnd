import { ObjectId } from 'mongodb';
import { IAddress } from './IAddress';

export interface IServiceBooking {
    serviceProviderId:ObjectId;
    serviceId: ObjectId;
    address: IAddress;
    serviceStatus?: 'pending' | 'in-progress' | 'completed' | 'cancelled'|'confirmed';
    paymentType?: 'cash' | 'card' | 'online'|'pending';
    paymentStatus: 'pending' | 'paid' | 'failed';
    userId: ObjectId;
    estimatedServiceTime?: Date;
    bookedTime?: Date;
    serviceCompletedTime?: Date;
    cancelReason?:string
}
