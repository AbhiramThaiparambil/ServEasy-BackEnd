import { Schema, model, Document } from "mongoose";
import {IReview} from "../../domain/entities/IReview"

const ReviewSchema = new Schema<IReview>({
  serviceId: { type: Schema.Types.ObjectId, ref: "services", required: true },
  userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  bookingId: { type: Schema.Types.ObjectId, ref: "servicebookings", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
}, { timestamps: true });

ReviewSchema.index({ bookingId: 1 }, { unique: true });


export const ReviewModel = model<IReview>("Review", ReviewSchema);
