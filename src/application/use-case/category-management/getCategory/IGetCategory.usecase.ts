import { ICategory } from "../../../../domain/entities/ICategory ";

export interface IGetCategory {
  execute(): Promise<void | ICategory[]>;
}
