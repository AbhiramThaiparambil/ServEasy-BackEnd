import { inject, injectable } from "tsyringe";
import { IEditCategory } from "./IEditCategory.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { ICategoryRepository } from "../../../../../domain/repositories/IcategoryRepository";
import { EditCategoryDTO } from "../../../../dtos/admin/category/EditCategoryDTO";
import { CategoryResponseDTO } from "../../../../dtos/admin/category/CategoryResponseDTO";

@injectable()
export class EditCategory implements IEditCategory {
  constructor(
    @inject(REPOSITORY_TOKENS.CategoryRepository)
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(data: EditCategoryDTO): Promise<CategoryResponseDTO> {
    const { categoryId, newName } = data;
    try {
      const category = await this.categoryRepository.getCategoryById(
        categoryId
      );
      if (!category) {
        throw new Error("Category does not exist");
      }

      category.category = newName;
      await this.categoryRepository.updateCategory(categoryId, category);

      return "Category updated successfully";
    } catch (error: any) {
      throw new Error(
        error.message || "An error occurred while updating the category"
      );
    }
  }
}
