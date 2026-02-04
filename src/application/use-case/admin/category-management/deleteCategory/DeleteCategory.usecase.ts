import { inject, injectable } from "tsyringe";

import { IDeleteCategory } from "./IDeleteCategory.usecase";
import { ICategoryRepository } from "../../../../../domain/repositories/IcategoryRepository";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";

@injectable()
export class DeleteCategory implements IDeleteCategory {
  constructor(
    @inject(REPOSITORY_TOKENS.CategoryRepository)
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(categoryId: string): Promise<string> {
    try {
      const category = await this.categoryRepository.getCategoryById(
        categoryId
      );
      if (!category) {
        throw new Error("Category does not exist");
      }

      await this.categoryRepository.deleteCategory(categoryId);
      return "Category deleted successfully";
    } catch (error: any) {
      throw new Error(
        error.message || "An error occurred while deleting the category"
      );
    }
  }
}
