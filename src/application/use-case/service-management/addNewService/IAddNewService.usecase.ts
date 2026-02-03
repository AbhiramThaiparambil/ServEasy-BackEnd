import { IService } from "../../../../domain/entities/IService";

export interface IAddNewServiceUseCase {
  execute(service: IService): Promise<any>;
}
