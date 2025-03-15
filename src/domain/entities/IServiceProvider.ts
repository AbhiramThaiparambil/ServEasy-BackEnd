import mongoose from 'mongoose'
export interface ISkill {
    name: string;
    level: string; 
}

export interface IServiceProvider {
    _id?:mongoose.Schema.Types.ObjectId;
    userId:mongoose.Schema.Types.ObjectId;
    serviceProviderName: string;
    serviceProviderEmail: string;
    serviceProviderPhone: string;
    experience: number;
    location: string;
    services: string[];
    skills: ISkill[];
    profileImage?: string;
    document?: string;
    socialMedia?: string;
    businessType?: string;
    category?: string;
    subcategory?: string;
    description?: string;
    serviceMode?: string; 
    isVerified?: 'verified' | 'pending' | 'rejected';
}
