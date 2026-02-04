export interface IBlockUnblockProviderUseCase {
  blockServiceProvider(serviceProviderId: string): Promise<boolean>;
  unblockServiceProvider(serviceProviderId: string): Promise<boolean>;
}
