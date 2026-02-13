import { inject, injectable } from "tsyringe";
import { IBlockUnblockCategoryService } from "./IBlockUnblockCategoryService.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { ICategoryRepository } from "../../../../../domain/repositories/IcategoryRepository";
import { BlockUnblockCategoryServiceDTO } from "../../../../dtos/admin/category/BlockUnblockCategoryServiceDTO";
import { CategoryResponseDTO } from "../../../../dtos/admin/category/CategoryResponseDTO";
import { getErrorMessage } from "../../../../../utils/errorUtils";


@injectable()
export class BlockUnblockCategoryService
  implements IBlockUnblockCategoryService
{
  constructor(
    @inject(REPOSITORY_TOKENS.CategoryRepository)
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(
    data: BlockUnblockCategoryServiceDTO
  ): Promise<CategoryResponseDTO> {
    const { categoryId, serviceId } = data;
    try {
      const category = await this.categoryRepository.getCategoryById(
        categoryId
      );
      if (!category) {
        throw new Error("Category does not exist");
      }

      const service = category.typeService?.find(
        (s) => s.id?.toString() === serviceId
      );

      if (!service) {
        throw new Error("Service does not exist");
      }

      service.isHidden = !service.isHidden;

      await this.categoryRepository.updateCategory(categoryId, category);
      return `Service visibility changed successfully`;
    } catch (error: unknown) {
      throw new Error(
        getErrorMessage(error) ||
          "An error occurred while updating the service visibility"
      );
    }
  }
}
