import { DeleteServiceDTO, CategoryResponseDTO } from "../../../../dtos/admin/category/CategoryDTO";

export interface IDeleteService {
  execute(data: DeleteServiceDTO): Promise<CategoryResponseDTO>;
}
