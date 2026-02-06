import { IAd } from "../../../../../domain/entities/IAd";
import { CreateAdRequestDTO } from "../../../../dtos/serviceProvider/ads/createAd/CreateAdRequestDTO";

export interface ICreateAdUseCase {
  execute(data: CreateAdRequestDTO): Promise<IAd | null>;
}
