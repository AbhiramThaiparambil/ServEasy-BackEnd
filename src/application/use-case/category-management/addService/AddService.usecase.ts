import { inject, injectable } from "tsyringe";

import { IAddService } from "./IAddService.usecase";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";
import { ICategoryRepository } from "../../../../domain/repositories/IcategoryRepository";
import { IServiceType } from "../../../../domain/entities/ICategory ";

@injectable()
export class AddService implements IAddService {
  constructor(
    @inject(REPOSITORY_TOKENS.CategoryRepository)
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(
    categoryId: string,
    data: IServiceType
  ): Promise<string | void> {
    try {
      const categorie = await this.categoryRepository.getCategoryById(
        categoryId
      );
      if (!categorie) {
        throw new Error("categories do not exist");
      }
      categorie.typeService?.push(data);
      await this.categoryRepository.updateCategory(categoryId, categorie);

      return "service added successfully";
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
