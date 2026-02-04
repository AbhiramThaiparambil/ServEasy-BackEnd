import { BlockUnblockCategoryServiceDTO, CategoryResponseDTO } from "../../../../dtos/admin/category/CategoryDTO";

export interface IBlockUnblockCategoryService {
  execute(data: BlockUnblockCategoryServiceDTO): Promise<CategoryResponseDTO>;
}
