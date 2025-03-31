import { Schema, Types } from "mongoose";
import { IServiceBooking } from "../entities/IserviceBooking";

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
  findBookedServicesAndServiceByServiceProviderId(Id: Types.ObjectId): Promise<any>;

}
