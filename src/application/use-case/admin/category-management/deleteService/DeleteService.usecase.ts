import { inject, injectable } from "tsyringe";

import { IDeleteService } from "./IDeleteService.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { ICategoryRepository } from "../../../../../domain/repositories/IcategoryRepository";
import { DeleteServiceDTO } from "../../../../dtos/admin/category/DeleteServiceDTO";
import { CategoryResponseDTO } from "../../../../dtos/admin/category/CategoryResponseDTO";
import { getErrorMessage } from "../../../../../utils/errorUtils";


@injectable()
export class DeleteService implements IDeleteService {
  constructor(
    @inject(REPOSITORY_TOKENS.CategoryRepository)
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(data: DeleteServiceDTO): Promise<CategoryResponseDTO> {
    const { categoryId, serviceId } = data;
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

      let serviceFound = false;
      category.typeService = category.typeService.filter((service) => {
        if (service.id === serviceId) {
          serviceFound = true;
          return false;
        }
        return true;
      });

      if (!serviceFound) {
        throw new Error("Service ID not found in the category");
      }

      await this.categoryRepository.updateCategory(categoryId, category);

      return "Service deleted successfully";
    } catch (error: unknown) {
      throw new Error(
        getErrorMessage(error) || "An error occurred while deleting the service"
      );
    }
  }
}
