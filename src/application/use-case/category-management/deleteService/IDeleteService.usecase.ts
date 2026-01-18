export interface IDeleteService {
  execute(categoryId: string, serviceId: string): Promise<string>;
}
