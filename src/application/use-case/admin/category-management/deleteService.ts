import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "../../../../domain/repositories/IcategoryRepository";

@injectable()
export class DeleteService {
  constructor(
    @inject("ICategoryRepository") private categoryRepository: ICategoryRepository
  ) {}

  async execute(categoryId: string, serviceId: string): Promise<string> {
    try {
      const category = await this.categoryRepository.getCategoryById(categoryId);
      if (!category) {
        throw new Error("Category does not exist");
      }

      if (!category.typeService) {
        throw new Error("No services found in this category");
      }

      // Remove the service with the given serviceId
      category.typeService = category.typeService.filter(service => service.id !== serviceId);

      await this.categoryRepository.updateCategory(categoryId, category);
      return "Service deleted successfully from category";
    } catch (error: any) {
      throw new Error(error.message || "An error occurred while deleting the service");
    }
  }
}
