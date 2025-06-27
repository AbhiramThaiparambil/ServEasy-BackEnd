import { Schema, Types } from "mongoose";
import {IServiceBooking} from "../entities/IserviceBooking"
export interface IServiceBookingRepository {
  findBookedServicesByUserId(
    userId: Types.ObjectId
  ): Promise<IServiceBooking[]>;
  findServicesByProviderId(
    serviceProviderId: Types.ObjectId
  ): Promise<IServiceBooking[]>;
  createServiceBooking(
    serviceBookingData: IServiceBooking
  ): Promise<IServiceBooking>;
  updateServiceStatus(
    serviceBookingId: Types.ObjectId,
    serviceStatus: string
  ): Promise<IServiceBooking | null>;
  updatePaymentStatus(
    serviceBookingId: Types.ObjectId,
    paymentStatus: string,
    paymentType:string

  ): Promise<IServiceBooking | null>;

  findBookedServicesAndServiceByUserId(Id: Types.ObjectId,skip:number,limit:number): Promise<any>;
  findBookedServicesAndServiceByServiceProviderId(
    Id: Types.ObjectId,    skip: number,
    limit: number
  ): Promise<any>;

  confirmBooking(
    id: Types.ObjectId,
    newStatus: string,
    estimatedServiceTime: string
  ): Promise<IServiceBooking | null>;

  cancelBooking(
      id: Types.ObjectId,
      newStatus: string,
      cancelReason: string
    ): Promise<IServiceBooking | null> 
   

  isServiceTimeConflicting(
    serviceProviderId: Types.ObjectId,
    estimatedServiceTime: string
  ): Promise<boolean>;

}
