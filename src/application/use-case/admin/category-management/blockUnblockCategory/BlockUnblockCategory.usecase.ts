import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "../../../../../domain/repositories/IcategoryRepository";
import { IBlockUnblockCategory } from "./IBlockUnblockCategory.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";

@injectable()
export class BlockUnblockCategory implements IBlockUnblockCategory {
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

      category.isHidden = !category.isHidden;
      await this.categoryRepository.updateCategory(categoryId, category);

      return `Category visibility changed to ${
        category.isHidden ? "hidden" : "visible"
      }`;
    } catch (error: any) {
      throw new Error(
        error.message || "An error occurred while updating the category"
      );
    }
  }
}
