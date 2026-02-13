import { ICategory } from "../../../../../domain/entities/ICategory ";
import { GetCategoryRequestDTO } from "../../../../dtos/common/category/getCategory/GetCategoryDTO";

export interface IGetCategory {
  execute(data?: GetCategoryRequestDTO): Promise<void | ICategory[]>;
}
