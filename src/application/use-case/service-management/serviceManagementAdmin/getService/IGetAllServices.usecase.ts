export interface IGetAllServices {
  execute(skip: number, limit: number, search: string): Promise<any>;
}
