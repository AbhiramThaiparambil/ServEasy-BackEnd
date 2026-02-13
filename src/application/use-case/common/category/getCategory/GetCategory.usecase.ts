import { inject, injectable } from "tsyringe";

import { IGetCategory } from "./IGetCategory.usecase";
import { ICategoryRepository } from "../../../../../domain/repositories/IcategoryRepository";
import { ICategory } from "../../../../../domain/entities/ICategory ";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { GetCategoryRequestDTO } from "../../../../dtos/common/category/getCategory/GetCategoryDTO";
import { getErrorMessage } from "../../../../../utils/errorUtils";


@injectable()
export class GetCategoryUseCase implements IGetCategory {
  constructor(
    @inject(REPOSITORY_TOKENS.CategoryRepository)
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(data?: GetCategoryRequestDTO): Promise<void | ICategory[]> {
    try {
      return this.categoryRepository.getAllCategories();
    } catch (error: unknown) {
      console.log(getErrorMessage(error));
    }
  }

  async getActiveCategory(data?: GetCategoryRequestDTO) {
    return await this.categoryRepository.getActiveCategories();
  }
}
