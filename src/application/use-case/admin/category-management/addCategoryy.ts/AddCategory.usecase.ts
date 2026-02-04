import { inject, injectable } from "tsyringe";
import { IAddCategory } from "./IAddCategory.usecase";
import { ICategoryRepository } from "../../../../../domain/repositories/IcategoryRepository";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { AddCategoryDTO, CategoryResponseDTO } from "../../../../dtos/admin/category/CategoryDTO";

@injectable()
export class AddCategory implements IAddCategory {
  constructor(
    @inject(REPOSITORY_TOKENS.CategoryRepository)
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(data: AddCategoryDTO): Promise<CategoryResponseDTO> {
    try {
      return await this.categoryRepository.addCategory(data.category);
    } catch (error) {
      console.log(error);
    }
  }
}
