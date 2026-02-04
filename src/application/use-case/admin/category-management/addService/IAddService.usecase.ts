import { AddServiceDTO, CategoryResponseDTO } from "../../../../dtos/admin/category/CategoryDTO";

export interface IAddService {
  execute(data: AddServiceDTO): Promise<CategoryResponseDTO>;
}
