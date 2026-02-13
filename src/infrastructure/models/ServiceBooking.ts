import { Schema, model } from "mongoose";
import { IServiceBooking } from "../../domain/entities/IServiceBooking";

const PaymentSchema = new Schema({
  serviceCost: { type: Number, required: true },
  materialCost: { type: Number },
  travelCost: { type: Number, required: true },
  inspectionCost: { type: Number, required: true },
  convenienceFee: { type: Number, required: true },
  total: { type: Number, required: true },
  discountAmount: { type: Number, required: true },
  finalTotal: { type: Number, required: true },
});

const CouponAppliedSchema = new Schema({
  code: { type: String, required: true },
  discountAmount: { type: Number, required: true },
  appliedAt: { type: Date, required: true },
});

const ServiceBookingSchema = new Schema<IServiceBooking>(
  {
    serviceProviderId: {
      type: Schema.Types.ObjectId,
      ref: "ServiceProvider",
      required: true,
    },
    serviceId: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    address: {},
    serviceStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "in-progress", "completed", "cancelled", "confirmed"],
      required: true,
    },
    paymentType: {
      type: String,
      default: "pending",
      enum: ["cash", "card", "online", "pending", "wallet"],
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "paid", "failed", "pending", "completed"],
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    estimatedServiceTime: { type: String },
    bookedTime: { type: Date },
    payment: { type: PaymentSchema },
    coupon: CouponAppliedSchema,
    cancelReason: { type: String },
    serviceCompletedTime: { type: Date },
    serviceBills: { type: Array },
    isOnlineService: { type: Boolean },
    reviewId: { type: Schema.Types.ObjectId, ref: "Review" },

    liveLocation: {
      lat: { type: Number },
      lng: { type: Number },
    },
    preferredSlot: {
      date: { type: Date },

      time: {
        type: String,
        enum: ["morning", "afternoon", "anyTime"],
      },
    },
    serviceSlot: {
      date: { type: Date },

      startTime: { type: String },
      endTime: { type: String },
    },
    bookingHistory: [
      {
        action: {
          type: String,
        },
        message: { type: String },
        timestamp: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const ServiceBooking = model<IServiceBooking>(
  "ServiceBooking",
  ServiceBookingSchema
);
export default ServiceBooking;
