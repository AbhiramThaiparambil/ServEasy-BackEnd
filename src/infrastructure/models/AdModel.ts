import { Schema, model } from 'mongoose';

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
      address :{type:String}
    },

    radiusKm: { type: Number },

  

    startDate: { type: Date },
    endDate: { type: Date },

    views: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["active" ,"block" ,"expired"],
      default: 'active',
    },
  },
  { timestamps: true }
);

AdSchema.index({ targetLocation: '2dsphere' });

export const AdModel = model('ads', AdSchema);
