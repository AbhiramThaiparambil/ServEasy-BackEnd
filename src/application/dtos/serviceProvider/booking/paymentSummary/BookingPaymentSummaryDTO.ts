import { IAddress } from "../../../../../domain/entities/IAddress";
import { IPayment } from "../../../../../domain/entities/IPayment";

export interface PaymentDetails {
  convenienceFee: number;
  inspectionCost: number;
  materialCost: number | null;
  serviceCost: number;
  total: number;
  travelCost: number;
}

export interface ServiceBookedAddress {
  description: string;
  houseName: string;
  landmark: string;
  name: string;
  phone: string;
  pincode: string;
  state: string;
  _id: string;
}

export interface ServiceBooking {
  _id: string;
  payment: PaymentDetails;
  paymentType: string;
  serviceBookedAddress: ServiceBookedAddress;
  serviceImage: string;
  serviceName: string;
  serviceStatus: string;
  serviceType: string;
  userEmail: string;
  userName: string;
  userProfile: string;
}

export interface GetBookingPaymentSummaryRequestDTO {
  serviceProviderId: string;
}


export interface ICompletedServiceByProvider {
  _id: string;

  payment?: IPayment;

  paymentType?: "cash" | "card" | "online" | "pending" | "wallet";

  paymentStatus: "pending" | "paid" | "failed" | "completed";

  serviceStatus:
    | "pending"
    | "in-progress"
    | "completed"
    | "cancelled"
    | "confirmed";

  address?: IAddress;

  serviceImage?: string;
  serviceName?: string;
  serviceType?: string;

  userEmail?: string;
  userName?: string;
  userProfile?: string;
  userPhone?: string;
}
