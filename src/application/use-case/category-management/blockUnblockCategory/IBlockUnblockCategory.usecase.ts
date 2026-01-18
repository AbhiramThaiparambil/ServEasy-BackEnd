export interface IBlockUnblockCategory {
  execute(categoryId: string): Promise<string>;
}
