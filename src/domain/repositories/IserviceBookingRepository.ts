import { ClientSession, Types } from "mongoose";
import {
  IBookedServiceWithDetails,
  IServiceBooking,
} from "../entities/IServiceBooking";
import { IFindPaymentInfoAdminDTO } from "../../application/dtos/admin/bookings/GetAdminBookingHistoryDTO";
import { GetPaymentInfoResponseDTO } from "../../application/dtos/serviceProvider/payment/getPaymentInfo/GetPaymentInfoDTO";
import { ICompletedServiceByProvider } from "../../application/dtos/serviceProvider/booking/paymentSummary/BookingPaymentSummaryDTO";
import { IPayment } from "../entities/IPayment";
export interface IServiceBookingRepository {
  findBookedServicesByUserId(
    userId: Types.ObjectId,
  ): Promise<IServiceBooking[]>;
  findServicesByProviderId(
    serviceProviderId: Types.ObjectId,
  ): Promise<IServiceBooking[]>;
  createServiceBooking(
    serviceBookingData: IServiceBooking,
    session?: ClientSession,
  ): Promise<IServiceBooking>;
  findById(serviceId: string): Promise<IServiceBooking | null>;
  updateServiceStatus(
    serviceBookingId: Types.ObjectId,
    serviceStatus: string,
  ): Promise<IServiceBooking | null>;
  updatePaymentStatus(
    serviceBookingId: Types.ObjectId,
    paymentStatus: string,
    paymentType: string,
  ): Promise<IServiceBooking | null>;

  findBookedServicesAndServiceByUserId(
    Id: Types.ObjectId,
    skip: number,
    limit: number,
  ): Promise<IBookedServiceWithDetails[]>;
  findBookedServicesAndServiceByServiceProviderId(
    Id: Types.ObjectId,
    skip: number,
    limit: number,
  ): Promise<IBookedServiceWithDetails[]>;

  confirmBooking(
    id: Types.ObjectId,
    newStatus: string,
    estimatedServiceTime: string,
  ): Promise<IServiceBooking | null>;

  cancelBooking(
    id: Types.ObjectId,
    newStatus: string,
    cancelReason: string,
  ): Promise<IServiceBooking | null>;

  isServiceTimeConflicting(
    serviceProviderId: Types.ObjectId,
    estimatedServiceTime: string,
  ): Promise<boolean>;

  addBookingHistory(
    bookingId: Types.ObjectId,
    action: string,
    message: string,
    session?: ClientSession,
  ): Promise<void>;

  findBookedServiceById(id: Types.ObjectId): Promise<IServiceBooking | null>;
  update(
    bookingId: string,
    data: Partial<IServiceBooking>,
  ): Promise<IServiceBooking | null>;
  removeCouponAndUpdatePayment(bookingId: string): Promise<IServiceBooking>;
  countActiveServices(providerId: Types.ObjectId): Promise<number>;

  hasActiveBooking(
    userId: Types.ObjectId,
    serviceId: Types.ObjectId,
  ): Promise<boolean>;

  rescheduleOnlineService(
    bookingId: Types.ObjectId,

    date: Date,
    startTime: Date,
    endTime: Date,
  ): Promise<IServiceBooking | null>;

  findCompletedByProvider(
    serviceProviderId: string,
  ): Promise<ICompletedServiceByProvider[]>;
  updateReviewId(
    bookingId: Types.ObjectId,
    reviewId: Types.ObjectId,
  ): Promise<void>;

  getPaymentInfo(
    startDate?: Date | null,
    endDate?: Date | null,
  ): Promise<GetPaymentInfoResponseDTO>;

  getPaymentInfoServiceProvider(
    serviceProviderId: string,
    startDate?: Date | null,
    endDate?: Date | null,
  ): Promise<unknown>;

  checkAvailability(
    serviceProviderId: Types.ObjectId,
  ): Promise<{ available: boolean; reason?: string }>;

  findPaymentInfoAdmin(
    skip: number,
    limit: number,
    search: string,
    status: string,
    statusField: "serviceStatus" | "paymentStatus",
  ): Promise<IFindPaymentInfoAdminDTO[]>;

     requestPayment(id: Types.ObjectId, status: string, payment: IPayment):Promise<IServiceBooking|null> 
  
}
