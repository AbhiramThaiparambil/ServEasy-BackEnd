import { BlockUnblockCategoryServiceDTO } from "../../../../dtos/admin/category/BlockUnblockCategoryServiceDTO";
import { CategoryResponseDTO } from "../../../../dtos/admin/category/CategoryResponseDTO";

export interface IBlockUnblockCategoryService {
  execute(data: BlockUnblockCategoryServiceDTO): Promise<CategoryResponseDTO>;
}
