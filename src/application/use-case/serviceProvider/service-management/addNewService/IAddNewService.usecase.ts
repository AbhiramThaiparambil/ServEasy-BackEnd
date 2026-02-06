import { IService } from "../../../../../domain/entities/IService";
import { AddNewServiceRequestDTO } from "../../../../dtos/serviceProvider/service-management/addNewService/AddNewServiceRequestDTO";

export interface IAddNewServiceUseCase {
  execute(service: AddNewServiceRequestDTO): Promise<IService[] | null>;
}
