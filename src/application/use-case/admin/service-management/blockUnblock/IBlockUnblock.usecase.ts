export interface IBlockUnblockService {
  blockService(serviceId: string): Promise<boolean>;
  unblockService(serviceId: string): Promise<boolean>;
}
