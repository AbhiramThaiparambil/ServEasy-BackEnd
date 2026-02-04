import { IService } from "../../../../../domain/entities/IService";

export interface IEditServiceUseCase {
  execute(
    serviceId: string,
    serviceData: IService,
    serviceNewImg?: string
  ): Promise<IService | null>;
}
