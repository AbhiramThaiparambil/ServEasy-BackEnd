import { IService } from "../../../../../domain/entities/IService";
import { EditServiceRequestDTO } from "../../../../dtos/serviceProvider/service-management/editService/EditServiceRequestDTO";

export interface IEditServiceUseCase {
  execute(data: EditServiceRequestDTO): Promise<IService | null>;
}
