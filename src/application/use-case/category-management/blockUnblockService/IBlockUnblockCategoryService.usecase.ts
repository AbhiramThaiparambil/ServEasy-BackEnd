export interface IBlockUnblockCategoryService {
  execute(categoryId: string, serviceId: string): Promise<string>;
}
