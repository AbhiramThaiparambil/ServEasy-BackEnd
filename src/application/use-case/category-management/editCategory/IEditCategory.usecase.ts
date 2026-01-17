export interface IEditCategory {
  execute(categoryId: string, newName: string): Promise<string>;
}
