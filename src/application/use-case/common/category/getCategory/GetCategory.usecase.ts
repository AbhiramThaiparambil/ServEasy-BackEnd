import { inject, injectable } from "tsyringe";

import { IGetCategory } from "./IGetCategory.usecase";
import { ICategoryRepository } from "../../../../../domain/repositories/IcategoryRepository";
import { ICategory } from "../../../../../domain/entities/ICategory ";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";

@injectable()
export class GetCategory implements IGetCategory {
  constructor(
    @inject(REPOSITORY_TOKENS.CategoryRepository)
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(): Promise<void | ICategory[]> {
    try {
      return this.categoryRepository.getAllCategories();
    } catch (error) {
      console.log(error);
    }
  }

  async getActiveCategory() {
    return await this.categoryRepository.getActiveCategories();
  }
}
