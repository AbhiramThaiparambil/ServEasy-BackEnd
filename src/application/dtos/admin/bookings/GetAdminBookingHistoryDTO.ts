export type ServiceStatus = "pending" | "accepted" | "completed" | "cancelled";

export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

export type PaymentType = "online" | "cod";

export interface IFindPaymentInfoAdminDTO {
  _id: string;

  serviceBookedAddress: string;
  bookedTime: Date;
  estimatedServiceTime: number;

  serviceStatus: ServiceStatus;
  paymentStatus: PaymentStatus;
  paymentType: PaymentType;

  payment: number;
  serviceBills: number;

  serviceName?: string | null;
  serviceType?: string | null;
  serviceImage?: string | null;

  userName?: string | null;
  userEmail?: string | null;
  userPhone?: string | null;
  userProfile?: string | null;

  serviceProviderName?: string | null;
  serviceProviderEmail?: string | null;
  profileImage?: string | null;
}

export interface IFindPaymentInfoAdminRequestDTO {
  limit: number;
  skip: number;
  search: string;
  status: string;
  statusField: "serviceStatus" | "paymentStatus";
}
