import { IAdminAd, IAdStatus } from "../../utils/types/dto/IAdAdminDto";
import { IAdDTO } from "../../utils/types/dto/IAdDto";
import { IGetRecommendedAdsRequestDTO, IRecommendedAdDTO } from "../../utils/types/dto/IRecommendAdsDTO";
import { IAd } from "../entities/IAd";

export interface IAdRepository {
  createAd(data: IAd): Promise<IAd | null>;
  updateAd(id: string, data: Partial<IAd>): Promise<IAd | null>;
  getAdById(id: string): Promise<IAd | null>;
  getAdsByProvider(
    providerId: string,
    skip?: number,
    limit?: number
  ): Promise<IAdDTO[]>;
  getAllAds(skip: number, limit: number): Promise<IAdminAd[]>;
  getTotalAdCount(): Promise<number>;
  changeAdStatus(id: string, status: IAdStatus): Promise<boolean>;
  getTotalProviderAdCount(id: string): Promise<number>;
  findRecommendedAds(params: IGetRecommendedAdsRequestDTO): Promise<IRecommendedAdDTO[]>;

  blockAd(id: string): Promise<boolean>;
  unblockAd(id: string): Promise<boolean>;
  expireAd(id: string): Promise<boolean>;
}
 