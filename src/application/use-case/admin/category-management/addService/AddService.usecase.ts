import { inject, injectable } from "tsyringe";

import { IAddService } from "./IAddService.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { ICategoryRepository } from "../../../../../domain/repositories/IcategoryRepository";
import { AddServiceDTO, CategoryResponseDTO } from "../../../../dtos/admin/category/CategoryDTO";

@injectable()
export class AddService implements IAddService {
  constructor(
    @inject(REPOSITORY_TOKENS.CategoryRepository)
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(
    data: AddServiceDTO
  ): Promise<CategoryResponseDTO> {
    const { categoryId, service } = data;
    try {
      const categorie = await this.categoryRepository.getCategoryById(
        categoryId
      );
      if (!categorie) {
        throw new Error("categories do not exist");
      }
      categorie.typeService?.push(service);
      await this.categoryRepository.updateCategory(categoryId, categorie);

      return "service added successfully";
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
