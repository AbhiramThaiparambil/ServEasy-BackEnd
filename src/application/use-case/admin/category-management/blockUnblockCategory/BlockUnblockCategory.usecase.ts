import { inject, injectable } from "tsyringe";
import { IBlockUnblockCategory } from "./IBlockUnblockCategory.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { ICategoryRepository } from "../../../../../domain/repositories/IcategoryRepository";
import { BlockUnblockCategoryDTO, CategoryResponseDTO } from "../../../../dtos/admin/category/CategoryDTO";

@injectable()
export class BlockUnblockCategory implements IBlockUnblockCategory {
  constructor(
    @inject(REPOSITORY_TOKENS.CategoryRepository)
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(data: BlockUnblockCategoryDTO): Promise<CategoryResponseDTO> {
    const { categoryId } = data;
    try {
      const category = await this.categoryRepository.getCategoryById(
        categoryId
      );

      if (!category) {
        throw new Error("Category does not exist");
      }

      const newIsHiddenStatus = !category.isHidden;

      await this.categoryRepository.updateCategory(categoryId, {
        isHidden: newIsHiddenStatus,
      });

      return newIsHiddenStatus
        ? "Category hidden successfully"
        : "Category visible successfully";
    } catch (error: any) {
      throw new Error(
        error.message || "An error occurred while updating the category status"
      );
    }
  }
}
