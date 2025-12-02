import { IServiceNameDTO } from "../../../../utils/types/dto/IServiceNameDTO";

export interface IGetServiceNamesUseCase {
  execute(providerId: string): Promise<IServiceNameDTO[]>;
}
