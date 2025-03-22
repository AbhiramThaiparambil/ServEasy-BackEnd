import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "../../../../domain/repositories/IcategoryRepository";

@injectable()
export class DeleteCategory {
  constructor(
    @inject("ICategoryRepository") private categoryRepository: ICategoryRepository
  ) {}

  async execute(categoryId: string): Promise<string> {
    try {
      const category = await this.categoryRepository.getCategoryById(categoryId);
      if (!category) {
        throw new Error("Category does not exist");
      }

      await this.categoryRepository.deleteCategory(categoryId);
      return "Category deleted successfully";
    } catch (error: any) {
      throw new Error(error.message || "An error occurred while deleting the category");
    }
  }
}