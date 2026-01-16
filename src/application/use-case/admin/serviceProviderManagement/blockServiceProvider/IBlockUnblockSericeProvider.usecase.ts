export interface IBlockUnblockSericeProvider {
  blockServiceProvider(serviceProviderId: string): Promise<boolean>;
  unblockServiceProvider(serviceProviderId: string): Promise<boolean>;
}
