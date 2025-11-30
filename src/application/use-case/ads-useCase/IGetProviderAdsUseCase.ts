import { IAd } from "../../../domain/entities/IAd";
import { IAdDTO } from "../../../utils/types/dto/IAdDto";

export interface IGetProviderAdsUseCase{  execute(providerId: string): Promise<IAdDTO[]|[]> }
  