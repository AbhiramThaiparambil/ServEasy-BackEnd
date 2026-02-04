import { DeleteCategoryDTO, CategoryResponseDTO } from "../../../../dtos/admin/category/CategoryDTO";

export interface IDeleteCategory {
  execute(data: DeleteCategoryDTO): Promise<CategoryResponseDTO>;
}
