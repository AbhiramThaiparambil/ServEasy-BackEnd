import { Schema, model, Types } from "mongoose";
import { IService } from "../../domain/entities/IService";

const locationSchema = new Schema({
  address: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
});

const ServiceSchema = new Schema<IService>(
  {
    serviceName: { type: String, required: true },
    description: { type: String, required: true },
    serviceType: { type: String, required: true },
    category: { type: String, required: true },
    location: locationSchema,

    estimatedPrice: { type: Number, required: true },
    serviceProviderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isActive: { type: Boolean, default: true },
    // review: [
    //   {
    //     userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    //     rating: { type: Number, min: 1, max: 5, required: true },
    //     comment: { type: String },
    //   },
    // ],
    serviceImage: { type: String },
  },
  { timestamps: true }
);


const ServiceModel = model<IService>("Service", ServiceSchema);
export default ServiceModel;
