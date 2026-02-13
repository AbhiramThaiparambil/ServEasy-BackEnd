import { BlockUnblockServiceRequestDTO } from "../../../../dtos/admin/service/BlockUnblockServiceDTO";

export interface IBlockUnblockService {
  blockService(data: BlockUnblockServiceRequestDTO): Promise<boolean>;
  unblockService(data: BlockUnblockServiceRequestDTO): Promise<boolean>;
}
