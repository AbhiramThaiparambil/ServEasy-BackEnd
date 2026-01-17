import { IServiceType } from "../../../../domain/entities/ICategory ";

export interface IAddService {
  execute(categoryId: string, data: IServiceType): Promise<string | void>;
}
