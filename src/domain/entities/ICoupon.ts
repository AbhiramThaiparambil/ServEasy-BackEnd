export interface ICoupon {
  _id?: string; 
  code: string;
  description?: string;
  discountValue: number;
  minOrderAmount?: number; 
  validFrom: Date;
  validTo: Date;
  usageLimit?: number; 
  usedCount?: number; 
  userId?: string; 
  usedBy: string[]
  showInBanner: boolean;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  
}


export interface IBannerCoupon {
  code: string;
  description?: string;
  discountValue: number;
  validTo: Date;
}

export interface IBannerCouponResponse {
  coupon: IBannerCoupon | null;
  total: number;
}