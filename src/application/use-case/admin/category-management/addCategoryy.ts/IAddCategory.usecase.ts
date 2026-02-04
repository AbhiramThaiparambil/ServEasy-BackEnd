import { AddCategoryDTO, CategoryResponseDTO } from "../../../../dtos/admin/category/CategoryDTO";

export interface IAddCategory {
  execute(data: AddCategoryDTO): Promise<CategoryResponseDTO>;
}
