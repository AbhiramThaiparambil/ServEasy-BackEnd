import { ICategory } from "../../../../domain/entities/ICategory ";

export interface IAddCategory {
  execute(category: object): Promise<ICategory | void>;
}
