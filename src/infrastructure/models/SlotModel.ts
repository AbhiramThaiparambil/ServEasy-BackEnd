import { Schema, model } from "mongoose";
import { ISlot } from "../../domain/entities/ISlot";

const SlotSchema = new Schema(
  {
    serviceId: { type: Schema.Types.ObjectId, required: true, ref: "services" },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    booked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const SlotModel = model<ISlot>("Slot", SlotSchema);
