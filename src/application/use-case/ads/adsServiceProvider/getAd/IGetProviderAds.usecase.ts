import { IAdDTO } from "../../../../../utils/types/dto/IAdDto";

export interface IGetProviderAdsUseCase {
  execute(
    providerId: string,
    skip?: number,
    limit?: number
  ): Promise<{ ads: IAdDTO[] | []; count: number }>;
}
