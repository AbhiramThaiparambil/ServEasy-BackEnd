import { BlockUnblockCategoryDTO } from "../../../../dtos/admin/category/BlockUnblockCategoryDTO";
import { CategoryResponseDTO } from "../../../../dtos/admin/category/CategoryResponseDTO";

export interface IBlockUnblockCategory {
  execute(data: BlockUnblockCategoryDTO): Promise<CategoryResponseDTO>;
}
