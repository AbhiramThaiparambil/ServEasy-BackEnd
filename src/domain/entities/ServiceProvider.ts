export interface ISkill {
    name: string;
    level: string; 
}

export interface IServiceProvider {
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
