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
    userId: string,
  ): Promise<IServiceBooking[]>;
  findServicesByProviderId(
    serviceProviderId: string,
  ): Promise<IServiceBooking[]>;
  createServiceBooking(
    serviceBookingData: IServiceBooking,
    session?: unknown,
  ): Promise<IServiceBooking>;
  findById(serviceId: string): Promise<IServiceBooking | null>;
  updateServiceStatus(
    serviceBookingId: string,
    serviceStatus: string,
  ): Promise<IServiceBooking | null>;
  updatePaymentStatus(
    serviceBookingId: string,
    paymentStatus: string,
    paymentType: string,
  ): Promise<IServiceBooking | null>;

  findBookedServicesAndServiceByUserId(
    Id: string,
    skip: number,
    limit: number,
  ): Promise<IBookedServiceWithDetails[]>;
  findBookedServicesAndServiceByServiceProviderId(
    Id: string,
    skip: number,
    limit: number,
  ): Promise<IBookedServiceWithDetails[]>;

  confirmBooking(
    id: string,
    newStatus: string,
    estimatedServiceTime: string,
  ): Promise<IServiceBooking | null>;

  cancelBooking(
    id: string,
    newStatus: string,
    cancelReason: string,
  ): Promise<IServiceBooking | null>;

  isServiceTimeConflicting(
    serviceProviderId: string,
    estimatedServiceTime: string,
  ): Promise<boolean>;

  addBookingHistory(
    bookingId: string,
    action: string,
    message: string,
    session?: unknown,
  ): Promise<void>;

  findBookedServiceById(id: string): Promise<IServiceBooking | null>;
  update(
    bookingId: string,
    data: Partial<IServiceBooking>,
  ): Promise<IServiceBooking | null>;
  removeCouponAndUpdatePayment(bookingId: string): Promise<IServiceBooking>;
  countActiveServices(providerId: string): Promise<number>;

  hasActiveBooking(
    userId: string,
    serviceId: string,
  ): Promise<boolean>;

  rescheduleOnlineService(
    bookingId: string,

    date: Date,
    startTime: Date,
    endTime: Date,
  ): Promise<IServiceBooking | null>;

  findCompletedByProvider(
    serviceProviderId: string,
  ): Promise<ICompletedServiceByProvider[]>;
  updateReviewId(
    bookingId: string,
    reviewId: string,
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
    serviceProviderId: string,
  ): Promise<{ available: boolean; reason?: string }>;

  findPaymentInfoAdmin(
    skip: number,
    limit: number,
    search: string,
    status: string,
    statusField: "serviceStatus" | "paymentStatus",
  ): Promise<IFindPaymentInfoAdminDTO[]>;

     requestPayment(id: string, status: string, payment: IPayment):Promise<IServiceBooking|null> 
 
     
        rescheduleBooking(
         bookingId: string,
         newDate: string,
       ): Promise<IServiceBooking | null> 

  findCountBookedServicebyUserId(userId: string): Promise<number>;
  findCountBookedService(serviceProviderId: string): Promise<number>;
  uploadBills(id: string, uploadBills: string[] | string): Promise<IServiceBooking | null>;
  getBookedServiceCount(): Promise<number>;
  findPaymentInfoServiceProvider(id: string): Promise<unknown>;
}
