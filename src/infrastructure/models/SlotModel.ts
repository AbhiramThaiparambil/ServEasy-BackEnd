import { Schema, model, Document, Types } from 'mongoose';

export interface ISlotDocument extends Document {
  _id: Types.ObjectId;
  serviceId: Types.ObjectId;
  startTime: string;
  endTime: string;
  booked: boolean;
  createdAt: Date;
}

const SlotSchema = new Schema<ISlotDocument>(
  {
serviceId: { type: Schema.Types.ObjectId, required: true, ref: "services" },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    booked: { type: Boolean, default: false },
  },
  { timestamps: true } 
);

export const SlotModel = model<ISlotDocument>('Slot', SlotSchema);
