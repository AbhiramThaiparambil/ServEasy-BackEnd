import { AddServiceDTO } from "../../../../dtos/admin/category/AddServiceDTO";
import { CategoryResponseDTO } from "../../../../dtos/admin/category/CategoryResponseDTO";

export interface IAddService {
  execute(data: AddServiceDTO): Promise<CategoryResponseDTO>;
}
