import { BlockUnblockProviderDTO } from "../../../../dtos/admin/provider/BlockUnblockProviderDTO";

export interface IBlockUnblockProviderUseCase {
  blockServiceProvider(data: BlockUnblockProviderDTO): Promise<boolean>;
  unblockServiceProvider(data: BlockUnblockProviderDTO): Promise<boolean>;
}
