import mongoose, { Schema, Document } from "mongoose";
import { IServiceProvider } from "../../domain/entities/ServiceProvider";

interface ISkill {
    name: string;
    level: string;
}

interface IServiceProviderDocument extends Document, IServiceProvider {}

const SkillSchema = new Schema<ISkill>({
    name: { type: String, required: true },
    level: { type: String, required: true },
});

const ServiceProviderSchema = new Schema<IServiceProviderDocument>(
    {
        serviceProviderName: { type: String, required: true },
        serviceProviderEmail: { type: String, required: true },
        serviceProviderPhone: { type: String, required: true },
        description: { type: String, required: true },
        socialMedia: { type: String },
        services: { type: [String], required: true },
        skills: { type: [SkillSchema], required: true }, // Update here to use SkillSchema
        location: { type: String, required: true },
        experience: { type: Number, required: true },
        profileImage: { type: String },
        document: { type: String },
        isVerified: { type: String, enum: ['verified', 'pending', 'rejected'], default: "pending" },
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }, // Adds createdAt and updatedAt fields automatically
    }
);

const ServiceProviderModel = mongoose.model<IServiceProviderDocument>(
    "ServiceProvider",
    ServiceProviderSchema
);

export default ServiceProviderModel;
