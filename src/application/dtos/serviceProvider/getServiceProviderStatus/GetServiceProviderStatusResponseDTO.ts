export interface GetServiceProviderStatusResponseDTO {
  hasProvider: boolean;
  status?: "verified" | "pending" | "rejected";
}
