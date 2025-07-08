export interface IServiceBlockManager {
  blockService(serviceId: string): Promise<boolean>;
  unblockService(serviceId: string): Promise<boolean>;
}
