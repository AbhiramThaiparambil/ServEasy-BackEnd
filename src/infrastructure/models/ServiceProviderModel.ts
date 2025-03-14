import mongoose, { Schema, Document } from "mongoose";
import { IServiceProvider } from "../../domain/entities/IServiceProvider";

interface ISkill {
    name: string;
    level: string;
}

const SkillSchema = new Schema<ISkill>({
    name: { type: String, required: true },
    level: { type: String, required: true },
});

const ServiceProviderSchema = new Schema(
    {  
        serviceProviderName: { type: String, required: true },
        serviceProviderEmail: { type: String, required: true },
        serviceProviderPhone: { type: String, required: true },
        description: { type: String, required: true },
        socialMedia: { type: String },
        services: { type: [String], required: true },
        skills: { type: [SkillSchema], required: true }, 
        location: { type: String, required: true },
        experience: { type: Number, required: true },
        profileImage: { type: String },
        document: { type: String },
        isVerified: { type: String, enum: ['verified', 'pending', 'rejected'], default: "pending" },
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
