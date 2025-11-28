import { IAd } from "../entities/IAd";

export interface IAdRepository {
  createAd(data: IAd): Promise<IAd>;
  updateAd(id: string, data: Partial<IAd>): Promise<IAd | null>;
  getAdById(id: string): Promise<IAd | null>;
//   getAdsByProvider(providerId: string): Promise<IAd[]>;

  blockAd(id: string): Promise<boolean>;
  unblockAd(id: string): Promise<boolean>;
  expireAd(id: string): Promise<boolean>;
}
