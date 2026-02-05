import { ISkill, IBankDetails } from "../../../../domain/entities/IServiceProvider";
import { ISubscription } from "../../../../domain/entities/ISubscription";

export interface ProviderResponseDTO {
    _id?: string;
    userId: string;
    serviceProviderName: string;
    serviceProviderEmail: string;
    serviceProviderPhone: string;
    experience: number;
    location: string;
    services: string[];
    skills: ISkill[];
    profileImage?: string;
    document?: string[];
    socialMedia?: string;
    businessType?: string;
    category?: string;
    subcategory?: string;
    description?: string;
    serviceMode?: string;
    isVerified?: "verified" | "pending" | "rejected";
    bankDetails: IBankDetails;
    isBlocked: boolean;
    createdAt?: Date;
    subscriptions?:ISubscription[]
    
}
