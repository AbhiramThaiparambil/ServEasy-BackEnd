import { IAd } from "../../../../../domain/entities/IAd";
import { EditAdRequestDTO } from "../../../../dtos/serviceProvider/ads/editAd/EditAdRequestDTO";

export interface IEditAdUseCase {
  execute(data: EditAdRequestDTO): Promise<IAd | null>;
}
