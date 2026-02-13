import { BlockUnblockServiceRequestDTO } from "../../../../dtos/serviceProvider/service-management/blockUnblockService/BlockUnblockServiceRequestDTO";

export interface IBlockUnblockServiceUseCase {
  blockService(data: BlockUnblockServiceRequestDTO): Promise<boolean>;
  unblockService(data: BlockUnblockServiceRequestDTO): Promise<boolean>;
}
