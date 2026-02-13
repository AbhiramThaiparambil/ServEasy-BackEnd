import {
  GetNearbyServicesRequestDTO,
  GetNearbyServicesResponseDTO,
  GetAllActiveServicesRequestDTO,
  GetAllActiveServicesResponseDTO,
} from "../../../../../application/dtos/user/service/getService/GetAllActiveServiceDTO";
import { IOnlineService } from "../../../../../domain/entities/IService";

export interface IGetAllActiveServiceUseCase {
  getNearByServices(
    data: GetNearbyServicesRequestDTO,
  ): Promise<GetNearbyServicesResponseDTO>;

  execute(
    data: GetAllActiveServicesRequestDTO,
  ): Promise<GetAllActiveServicesResponseDTO>;

  getOnlineServicesWithSlot(serviceId: string): Promise<IOnlineService[]>;
}
