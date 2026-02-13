import { IServiceProviderRegistration } from "../../../../domain/entities/IServiceProvider";

export interface RegisterServiceProviderRequestDTO {
  serviceProviderData: IServiceProviderRegistration;
  profileImageRow: string;
  documentRow: string;
  document2Row?: string | null;
}

export interface ReapplyServiceProviderRequestDTO {
  serviceProviderData: IServiceProviderRegistration;
  profileImageRow: string | null;
  documentRow: string | null;
  document2Row: string | null;
}

export interface GetRegistrationDetailsRequestDTO {
  userId: string;
}

export interface UpdateUserWithProviderRequestDTO {
  userId: string;
  serviceProviderId: string;
}
