import { BlockUnblockCategoryDTO, CategoryResponseDTO } from "../../../../dtos/admin/category/CategoryDTO";

export interface IBlockUnblockCategory {
  execute(data: BlockUnblockCategoryDTO): Promise<CategoryResponseDTO>;
}
