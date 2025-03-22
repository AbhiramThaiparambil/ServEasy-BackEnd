import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "../../../../domain/repositories/IcategoryRepository";
import { ICategory } from "../../../../domain/entities/ICategory ";

@injectable()
export class EditCategory {
  constructor(
    @inject("ICategoryRepository") private categoryRepository: ICategoryRepository
  ) {}

  async execute(categoryId: string, newName: string): Promise<string> {
    try {
      const category = await this.categoryRepository.getCategoryById(categoryId);
      if (!category) {
        throw new Error("Category does not exist");
      }

      category.category = newName;
      await this.categoryRepository.updateCategory(categoryId, category);
      
      return "Category updated successfully";
    } catch (error: any) {
      throw new Error(error.message || "An error occurred while updating the category");
    }
  }
}