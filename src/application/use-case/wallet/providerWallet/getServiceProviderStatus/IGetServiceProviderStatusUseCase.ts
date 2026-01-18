export interface IGetServiceProviderStatusUseCase {
  execute(
    userId: string
  ): Promise<
    | { hasProvider: boolean; status?: undefined }
    | { hasProvider: boolean; status: "verified" | "pending" | "rejected" }
  >;
}
