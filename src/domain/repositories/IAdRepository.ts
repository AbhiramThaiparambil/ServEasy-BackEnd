import { IAdDTO } from "../../utils/types/dto/IAdDto";
import { IAd } from "../entities/IAd";

export interface IAdRepository {
  createAd(data: IAd): Promise<IAd|null>;
  updateAd(id: string, data: Partial<IAd>): Promise<IAd | null>;
  getAdById(id: string): Promise<IAd | null>;
  getAdsByProvider(providerId: string): Promise<IAdDTO[]>;

  blockAd(id: string): Promise<boolean>;
  unblockAd(id: string): Promise<boolean>;
  expireAd(id: string): Promise<boolean>;
}
