export interface EditProfileRequestDTO {
  serviceProviderId: string;
  serviceProviderName?: string;
  serviceProviderEmail?: string;
  serviceProviderPhone?: string;
  location?: string;
  bio?: string;
  profileImage?: string;
  isActive?: boolean;
}
