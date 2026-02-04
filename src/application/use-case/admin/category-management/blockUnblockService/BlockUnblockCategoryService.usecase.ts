import { inject, injectable } from "tsyringe";

import { IBlockUnblockCategoryService } from "./IBlockUnblockCategoryService.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { ICategoryRepository } from "../../../../../domain/repositories/IcategoryRepository";

@injectable()
export class BlockUnblockCategoryService
  implements IBlockUnblockCategoryService
{
  constructor(
    @inject(REPOSITORY_TOKENS.CategoryRepository)
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(categoryId: string, serviceId: string): Promise<string> {
    try {
      const category = await this.categoryRepository.getCategoryById(
        categoryId
      );
      if (!category) {
        throw new Error("Category does not exist");
      }
      if (!category.typeService) {
        throw new Error("Service type does not exist in this category");
      }

      let serviceUpdated = false;
      category.typeService = category.typeService.map((service) => {
        if (service.id === serviceId) {
          service.isHidden = !service.isHidden;
          serviceUpdated = true;
        }
        return service;
      });

      if (!serviceUpdated) {
        throw new Error("Service ID not found in the category");
      }

      console.log(category);

      await this.categoryRepository.updateCategory(categoryId, category);

      return `Service visibility changed successfully`;
    } catch (error: any) {
      throw new Error(
        error.message ||
          "An error occurred while updating the service visibility"
      );
    }
  }
}
