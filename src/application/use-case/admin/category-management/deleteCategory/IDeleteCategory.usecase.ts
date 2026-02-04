import { DeleteCategoryDTO } from "../../../../dtos/admin/category/DeleteCategoryDTO";
import { CategoryResponseDTO } from "../../../../dtos/admin/category/CategoryResponseDTO";

export interface IDeleteCategory {
  execute(data: DeleteCategoryDTO): Promise<CategoryResponseDTO>;
}
