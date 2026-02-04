export interface IBlockUnblockServiceUseCase {
  blockService(serviceId: string): Promise<boolean>;
  unblockService(serviceId: string): Promise<boolean>;
}
