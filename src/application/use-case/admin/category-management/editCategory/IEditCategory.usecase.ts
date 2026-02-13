import { EditCategoryDTO } from "../../../../dtos/admin/category/EditCategoryDTO";
import { CategoryResponseDTO } from "../../../../dtos/admin/category/CategoryResponseDTO";

export interface IEditCategory {
  execute(data: EditCategoryDTO): Promise<CategoryResponseDTO>;
}
