import { Schema, model } from "mongoose";
import { IServiceBooking } from "../../domain/entities/IserviceBooking";

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
      enum: ["cash", "card", "online", "pending"],
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "paid", "failed", "pending"],
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    estimatedServiceTime: { type: String },
    bookedTime: { type: Date },
    payment:{type:{}},
    cancelReason:{type:String},
    serviceCompletedTime: { type: Date },
    serviceBills:{type:Array}
  },
  { timestamps: true }
);

const ServiceBooking = model<IServiceBooking>(
  "ServiceBooking",
  ServiceBookingSchema
);
export default ServiceBooking;
