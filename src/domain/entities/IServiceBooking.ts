import { ObjectId } from 'mongodb';
import { IAddress } from './IAddress';
import { IPayment } from './Ipayment';

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
    payment?:IPayment,
    cancelReason?:string,
    serviceBills?:string[]
}
