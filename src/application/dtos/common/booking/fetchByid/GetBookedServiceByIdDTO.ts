import { IServiceBookingHistory } from "../../../../../domain/entities/IServiceBooking";

export interface GetBookedServiceByIdRequestDTO {
  bookingId: string;
}

export interface AddressDTO {
  name: string;
  houseName: string;
  pincode: string;
  state: string;
  phone: string;
}

export interface PaymentDTO {
  serviceCost?: number;
  materialCost: number;
  travelCost: number;
  inspectionCost: number;
  convenienceFee: number;
  total: number;
  discountAmount: number;
  finalTotal?: number;
}

export interface PreferredSlotDTO {
  date: string;
  time: string;
}

export interface CouponDTO {
  _id?: string;
  code: string;
  discountAmount: number;
  appliedAt: Date;
}

export interface LiveLocationDTO {
  lat: number;
  lng: number;
}

export interface ReviewDTO {
  _id?: string;
  userId: string;
  serviceId: string;
  bookingId: string;
  rating: number;
  comment: string;
}

export interface ServiceDTO {
  _id: string;
  serviceName: string;
  category: string;
  description: string;
  estimatedPrice: number;
  serviceImage: string;
  serviceType: string;
  serviceProviderId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceProviderDTO {
  _id: string;
  serviceProviderName: string;
  serviceProviderEmail: string;
  serviceProviderPhone: string;
  profileImage: string;
  description: string;
  experience: number;
  services: string[];
  location: string;
  isVerified: string;
  isBlocked: boolean;
  userId: string;
}

export interface UserDTO {
  _id: string;
  userName: string;
  profileImage: string;
  email: string;
  phone?: string;
}

export interface BookedServiceDTO {
  _id: string;
  userId: string;
  serviceId: string;
  serviceProviderId: string;

  bookedTime: string;
  estimatedServiceTime: string;

  serviceStatus: string;
  paymentStatus: string;
  paymentType: string;

  address: AddressDTO;

  createdAt: string;
  updatedAt: string;

  serviceBills?: string[];

  preferredSlot: PreferredSlotDTO;

  bookingHistory?: IServiceBookingHistory[];

  cancelReason?: string;

  payment?: PaymentDTO;

  coupon?: CouponDTO;
  serviceSlot?: IServiceSlot;
}

export interface IServiceSlot {
  date: string;
  startTime: string;
  endTime: string;
}
export interface BookedServiceForServiceProviderDTO extends Omit<
  BookedServiceDTO,
  "bookingHistory" | "coupon"
> {
  liveLocation: LiveLocationDTO;
}

export interface GetBookedServiceByIdForUserResponseDTO {
  bookedService: BookedServiceDTO;
  service: ServiceDTO;
  serviceProvider: ServiceProviderDTO;
  review?: ReviewDTO;
}

export interface GetBookedServiceByIdForServiceProviderResponseDTO {
  bookedService: BookedServiceForServiceProviderDTO;
  service: ServiceDTO;
  user: UserDTO;
  review?: ReviewDTO;
}
