import { ICategory } from "../../domain/entities/ICategory ";

export interface ICategoryRepository {
  addCategory(category: ICategory): Promise<ICategory>;
  getAllCategories(): Promise<ICategory[]>;
  getCategoryById(id: string): Promise<ICategory | null>;
  updateCategory(id: string, updateData: Partial<ICategory>): Promise<ICategory | null>;
  deleteCategory(id: string): Promise<boolean>;
  getActiveCategories(): Promise<ICategory[]>;
}
