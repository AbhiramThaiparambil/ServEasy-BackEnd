import { IServiceProvider } from "../../domain/entities/IServiceProvider";
import { ISubscription } from "../../domain/entities/ISubscription";

export interface SafeServiceProvider {
  _id?: string;
  serviceProviderName: string;
  serviceProviderEmail: string;
  serviceProviderPhone: string;
  description?: string;
  experience: number;
  profileImage?: string;
  isVerified: string;
  createdAt?: Date;
  location: string;
  services: string[];
  isBlocked:boolean;
  subscriptions?: ISubscription[];
  document?: string[];
  
}

export const serviceProviderSanitizer = (sp: IServiceProvider): SafeServiceProvider => {
  return {
    _id: sp._id?.toString(),
    serviceProviderName: sp.serviceProviderName,
    serviceProviderEmail: sp.serviceProviderEmail,
    serviceProviderPhone: sp.serviceProviderPhone,
    description: sp.description,
    experience: sp.experience,
    profileImage: sp.profileImage,
    isVerified: sp.isVerified|| "pending",
    createdAt: sp.createdAt,
    location: sp.location|| "",
    services: sp.services || [],
    isBlocked:sp.isBlocked,
    subscriptions:sp.subscriptions,
    document:sp.document,
  };
};
