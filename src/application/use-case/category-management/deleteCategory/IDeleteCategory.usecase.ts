export interface IDeleteCategory {
  execute(categoryId: string): Promise<string>;
}
