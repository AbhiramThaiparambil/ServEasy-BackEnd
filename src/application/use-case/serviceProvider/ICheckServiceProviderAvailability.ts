export interface ICheckServiceProviderAvailabilityUseCase {
  execute(serviceProviderId: string): Promise<any>;
}
