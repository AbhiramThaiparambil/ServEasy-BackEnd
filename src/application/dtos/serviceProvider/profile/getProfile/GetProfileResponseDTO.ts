export interface GetProfileResponseDTO {
  _id: string;
  serviceProviderName: string;
  serviceProviderEmail: string;
  serviceProviderPhone: string;
  location: string;
  bio?: string;
  profileImage?: string;
  isActive: boolean;
  createdAt: Date;
}
