import mongoose, { Schema, Document } from "mongoose";
import { IBankDetails, IServiceProvider } from "../../domain/entities/IServiceProvider";

interface ISkill {
    name: string;
    level: string;
}
const locationSchema = new Schema({
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  });

const SkillSchema = new Schema<ISkill>({
    name: { type: String, required: true },
    level: { type: String, required: true },
});

const BankDetailsSchema = new Schema<IBankDetails>(
  {
    accountHolderName: {
      type: String,
      required: true,
      trim: true,
    },
    accountNumber: {
      type: String,
      required: true,
      trim: true,
    },
    ifscCode: {
      type: String,
      required: true,
      
    },
  })

const ServiceProviderSchema = new Schema<IServiceProvider>(
    {  
        serviceProviderName: { type: String, required: true },
        serviceProviderEmail: { type: String, required: true },
        serviceProviderPhone: { type: String, required: true },
        description: { type: String, required: true },
        socialMedia: { type: String },
        services: { type: [String], required: true },
        skills: { type: [SkillSchema], required: true }, 
        location: locationSchema,
        experience: { type: Number, required: true },
        profileImage: { type: String },
        document: { type: [String] },
        isVerified: { type: String, enum: ['verified', 'pending', 'rejected'], default: "pending" },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        isBlocked:{type:Boolean,default:false},
       BankDetails:{ type: BankDetailsSchema, required: true }
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    }
);

const ServiceProviderModel = mongoose.model<IServiceProvider>(
    "ServiceProvider",
    ServiceProviderSchema
);

export default ServiceProviderModel;
