import { IBannerCouponResponse, ICoupon } from "../../../../domain/entities/ICoupon";

export interface GetFeaturedCouponsRequestDTO {
  skip: number;
}

export interface GetFeaturedCouponsResponseDTO extends IBannerCouponResponse {}

export interface GetAllActiveCouponsResponseDTO {
  coupons: ICoupon[];
}

export interface ApplyCouponRequestDTO {
  bookingId: string;
  couponCode: string;
  totalAmount?: number;
  userId?: string;
  serviceId?: string;
}

export interface ApplyCouponResponseDTO {
  discountAmount?: number;
  finalAmount?: number;
  message?: string;
  success: boolean;
  couponId?: string;
}

export interface RemoveCouponRequestDTO {
  bookingId: string;
}

export interface RemoveCouponResponseDTO {
  message?: string;
  success: boolean;
}
