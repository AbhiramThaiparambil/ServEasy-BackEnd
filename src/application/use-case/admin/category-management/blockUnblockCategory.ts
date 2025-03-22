import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "../../../../domain/repositories/IcategoryRepository";

@injectable()
export class BlockUnblockCategory {
  constructor(
    @inject("ICategoryRepository") private categoryRepository: ICategoryRepository
  ) {}

  async execute(categoryId: string): Promise<string> {
    try {
      const category = await this.categoryRepository.getCategoryById(categoryId);
      if (!category) {
        throw new Error("Category does not exist");
      }

      category.isHidden = !category.isHidden;
      await this.categoryRepository.updateCategory(categoryId, category);
      
      return `Category visibility changed to ${category.isHidden ? 'hidden' : 'visible'}`;
    } catch (error: any) {
      throw new Error(error.message || "An error occurred while updating the category");
    }
  }
}
