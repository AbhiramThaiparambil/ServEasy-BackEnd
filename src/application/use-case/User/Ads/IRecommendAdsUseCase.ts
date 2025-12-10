import { IGetRecommendedAdsRequestDTO, IRecommendedAdDTO } from "../../../../utils/types/dto/IRecommendAdsDTO";


export interface IRecommendAdsUseCase {
  execute(data: IGetRecommendedAdsRequestDTO): Promise<IRecommendedAdDTO[]>;
}
