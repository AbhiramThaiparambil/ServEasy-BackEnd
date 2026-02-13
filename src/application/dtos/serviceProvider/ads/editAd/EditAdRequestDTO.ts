import { IAd } from "../../../../../domain/entities/IAd";

export interface EditAdRequestDTO {
  adId: string;
  updateData: Partial<IAd>;
}
