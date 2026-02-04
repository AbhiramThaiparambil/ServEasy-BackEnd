import { EditCategoryDTO, CategoryResponseDTO } from "../../../../dtos/admin/category/CategoryDTO";

export interface IEditCategory {
  execute(data: EditCategoryDTO): Promise<CategoryResponseDTO>;
}
