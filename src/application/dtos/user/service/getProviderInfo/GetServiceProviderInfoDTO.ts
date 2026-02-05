import { IServiceProvider } from "../../../../../domain/entities/IServiceProvider";

export interface GetServiceProviderInfoRequestDTO {
  userId: string;
}

export interface GetServiceProviderInfoResponseDTO {
  provider: (IServiceProvider & { isProServiceProvider: boolean }) | null;
}
