import { Schema, model, Types } from 'mongoose';

const AdSchema = new Schema(
  {
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: 'services',
      required: true,
    },

    providerId: {
      type:  Schema.Types.ObjectId,
      ref: 'serviceproviders',
      required: true,
    },

    caption: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String ,default:null},

    targetLocation: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: { type: [Number] },
    },

    radiusKm: { type: Number },

    planType: {
      type: String,
      enum: ['basic', 'pro', 'premium'],
      default: 'basic',
    },

    startDate: { type: Date },
    endDate: { type: Date },

    views: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'blocked', 'expired'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

AdSchema.index({ targetLocation: '2dsphere' });

export const AdModel = model('ads', AdSchema);
