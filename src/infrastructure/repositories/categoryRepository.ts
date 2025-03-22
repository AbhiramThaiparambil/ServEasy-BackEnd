import { injectable } from "tsyringe";
import { ICategoryRepository } from "../../domain/repositories/IcategoryRepository";
import { ICategory } from "../../domain/entities/ICategory ";
import { CategoryModel } from "../models/categoryModel"; // Mongoose Model

@injectable()
export class CategoryRepository implements ICategoryRepository {
  
  async addCategory(category: ICategory): Promise<ICategory> {
    const newCategory = new CategoryModel(category);
    return await newCategory.save();
  }

  async getAllCategories(): Promise<ICategory[]> {
    return await CategoryModel.find();
  }

  async getCategoryById(id: string): Promise<ICategory | null> {
    return await CategoryModel.findById(id).exec();
  }

  async updateCategory(id: string, updateData: Partial<ICategory>): Promise<ICategory | null> {
    return await CategoryModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async deleteCategory(id: string): Promise<boolean> {
    const result = await CategoryModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
