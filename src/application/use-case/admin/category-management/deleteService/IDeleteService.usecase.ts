import { DeleteServiceDTO } from "../../../../dtos/admin/category/DeleteServiceDTO";
import { CategoryResponseDTO } from "../../../../dtos/admin/category/CategoryResponseDTO";

export interface IDeleteService {
  execute(data: DeleteServiceDTO): Promise<CategoryResponseDTO>;
}
