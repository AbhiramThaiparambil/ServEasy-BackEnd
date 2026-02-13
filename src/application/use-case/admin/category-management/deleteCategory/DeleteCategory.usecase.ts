import { inject, injectable } from "tsyringe";
import { IDeleteCategory } from "./IDeleteCategory.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { ICategoryRepository } from "../../../../../domain/repositories/IcategoryRepository";
import { DeleteCategoryDTO } from "../../../../dtos/admin/category/DeleteCategoryDTO";
import { CategoryResponseDTO } from "../../../../dtos/admin/category/CategoryResponseDTO";
import { getErrorMessage } from "../../../../../utils/errorUtils";


@injectable()
export class DeleteCategory implements IDeleteCategory {
  constructor(
    @inject(REPOSITORY_TOKENS.CategoryRepository)
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(data: DeleteCategoryDTO): Promise<CategoryResponseDTO> {
    const { categoryId } = data;
    try {
      const category = await this.categoryRepository.getCategoryById(
        categoryId
      );

      if (!category) {
        throw new Error("Category does not exist");
      }

      const deletedCategory = await this.categoryRepository.deleteCategory(
        categoryId
      );

      if (!deletedCategory) {
        throw new Error("Category not found or deletion failed");
      }

      return "Category deleted successfully";
    } catch (error: unknown) {
      throw new Error(
        getErrorMessage(error) || "An error occurred while deleting the category"
      );
    }
  }
}
