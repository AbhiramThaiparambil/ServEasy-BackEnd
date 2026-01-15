import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "../../../../../domain/repositories/IcategoryRepository";
import { ICategory } from "../../../../../domain/entities/ICategory ";
import { IAddCategory } from "./IAddCategory.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";

@injectable()
export class AddCategory implements IAddCategory {
  constructor(
    @inject(REPOSITORY_TOKENS.CategoryRepository)
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(category: object): Promise<ICategory | void> {
    try {
      return await this.categoryRepository.addCategory(category);
    } catch (error) {
      console.log(error);
    }
  }
}
