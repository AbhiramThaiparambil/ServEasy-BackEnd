import { IService } from "../../../../../domain/entities/IService";

export interface EditServiceRequestDTO {
  serviceId: string;
  serviceData: IService;
  serviceNewImg?: string;
}
