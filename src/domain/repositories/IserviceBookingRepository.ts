import { Schema, Types } from 'mongoose';
import { IBookedServiceWithDetails, IServiceBooking } from '../entities/IServiceBooking';
export interface IServiceBookingRepository {
  findBookedServicesByUserId(userId: Types.ObjectId): Promise<IServiceBooking[]>;
  findServicesByProviderId(serviceProviderId: Types.ObjectId): Promise<IServiceBooking[]>;
  createServiceBooking(serviceBookingData: IServiceBooking): Promise<IServiceBooking>;
  findById(serviceId:string):Promise<IServiceBooking|null>
  updateServiceStatus(
    serviceBookingId: Types.ObjectId,
    serviceStatus: string
  ): Promise<IServiceBooking | null>;
  updatePaymentStatus(
    serviceBookingId: Types.ObjectId,
    paymentStatus: string,
    paymentType: string
  ): Promise<IServiceBooking | null>;

  findBookedServicesAndServiceByUserId(
    Id: Types.ObjectId,
    skip: number,
    limit: number
  ): Promise<any>;
  findBookedServicesAndServiceByServiceProviderId(
    Id: Types.ObjectId,
    skip: number,
    limit: number
  ): Promise<IBookedServiceWithDetails>;

  confirmBooking(
    id: Types.ObjectId,
    newStatus: string,
    estimatedServiceTime: string
  ): Promise<IServiceBooking | null>;

  cancelBooking(
    id: Types.ObjectId,
    newStatus: string,
    cancelReason: string
  ): Promise<IServiceBooking | null>;

  isServiceTimeConflicting(
    serviceProviderId: Types.ObjectId,
    estimatedServiceTime: string
  ): Promise<boolean>;

  addBookingHistory(bookingId: Types.ObjectId, action: string, message: string): Promise<void>;

  findBookedServiceById(id: Types.ObjectId): Promise<IServiceBooking | null>;
  update(bookingId: string, data: Partial<IServiceBooking>): Promise<IServiceBooking | null>;
removeCouponAndUpdatePayment(bookingId: string): Promise<IServiceBooking>

}
