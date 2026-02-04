import { AddCategoryDTO } from "../../../../dtos/admin/category/AddCategoryDTO";
import { CategoryResponseDTO } from "../../../../dtos/admin/category/CategoryResponseDTO";

export interface IAddCategory {
  execute(data: AddCategoryDTO): Promise<CategoryResponseDTO>;
}
