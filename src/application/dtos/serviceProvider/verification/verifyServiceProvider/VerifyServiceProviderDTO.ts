export interface VerifyServiceProviderRequestDTO {
  userId: string;
}

export interface VerifyServiceProviderResponseDTO {
  success: boolean;
  refreshToken?: string;
  message?: string;
}
