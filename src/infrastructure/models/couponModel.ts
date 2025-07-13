import { Schema, model } from 'mongoose';
import { ICoupon } from '../../domain/entities/ICoupon';

const CouponSchema = new Schema<ICoupon>(
  {
    code: { type: String, required: true, unique: true },
    description: { type: String },
    discountValue: { type: Number, required: true },
    minOrderAmount: { type: Number },
    validFrom: { type: Date, required: true },
    validTo: { type: Date, required: true },
    usageLimit: { type: Number },
    usedCount: { type: Number, default: 0 },
    userId: { type: String },
    showInBanner: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const CouponModel = model<ICoupon>('Coupon', CouponSchema);
