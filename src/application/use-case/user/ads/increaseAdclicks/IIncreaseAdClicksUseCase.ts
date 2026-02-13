import { IncreaseAdClicksRequestDTO } from "../../../../dtos/user/ads/increaseAdClicks/IncreaseAdClicksDTO";

export interface IIncreaseAdClicksUseCase {
   execute(data: IncreaseAdClicksRequestDTO): Promise<number>;
}