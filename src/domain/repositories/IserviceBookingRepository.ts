import { Schema, Types } from "mongoose";
import {IServiceBooking} from "../../domain/entities/IServiceBooking"

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
    paymentStatus: string
  ): Promise<IServiceBooking | null>;

  findBookedServicesAndServiceByUserId(Id: Types.ObjectId): Promise<any>;
  findBookedServicesAndServiceByServiceProviderId(
    Id: Types.ObjectId
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

}
