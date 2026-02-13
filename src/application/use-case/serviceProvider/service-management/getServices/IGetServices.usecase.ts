import { GetProviderServicesRequestDTO } from "../../../../dtos/serviceProvider/service-management/getServices/GetProviderServicesRequestDTO";
import { IService } from "../../../../../domain/entities/IService";

export interface IGetServicesUseCase {
  execute(data: GetProviderServicesRequestDTO): Promise<IService[] | null>;
}
