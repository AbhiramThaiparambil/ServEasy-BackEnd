import { IServiceNameDTO } from "../../../../../utils/types/dto/IServiceNameDTO";
import { GetServiceNamesRequestDTO } from "../../../../dtos/serviceProvider/service-management/getServiceNames/GetServiceNamesRequestDTO";

export interface IGetServiceNamesUseCase {
  execute(data: GetServiceNamesRequestDTO): Promise<IServiceNameDTO[]>;
}
