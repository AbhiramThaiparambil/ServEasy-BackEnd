import { inject, injectable } from "tsyringe";
import { IDeleteCategory } from "./IDeleteCategory.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { ICategoryRepository } from "../../../../../domain/repositories/IcategoryRepository";
import { DeleteCategoryDTO, CategoryResponseDTO } from "../../../../dtos/admin/category/CategoryDTO";

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
    } catch (error: any) {
      throw new Error(
        error.message || "An error occurred while deleting the category"
      );
    }
  }
}
