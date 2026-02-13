import { inject, injectable } from "tsyringe";
import { IBlockUnblockCategory } from "./IBlockUnblockCategory.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { ICategoryRepository } from "../../../../../domain/repositories/IcategoryRepository";
import { BlockUnblockCategoryDTO } from "../../../../dtos/admin/category/BlockUnblockCategoryDTO";
import { CategoryResponseDTO } from "../../../../dtos/admin/category/CategoryResponseDTO";
import { getErrorMessage } from "../../../../../utils/errorUtils";


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
    } catch (error: unknown) {
      throw new Error(
        getErrorMessage(error) || "An error occurred while updating the category status"
      );
    }
  }
}
