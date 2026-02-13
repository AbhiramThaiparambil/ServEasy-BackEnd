import { injectable, inject } from "tsyringe";
import { IAdminGetAdsUseCase } from "./IAdminGetAds.usecase";
import { IAdRepository } from "../../../../../domain/repositories/IAdRepository";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";

import { GetAdsAdminDTO, GetAdsAdminResponseDTO } from "../../../../dtos/admin/GetAdsAdminDTO";

@injectable()
export class AdminGetAdsUseCase implements IAdminGetAdsUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.AdRepository) private adRepository: IAdRepository
  ) {}

  async execute(
    data: GetAdsAdminDTO
  ): Promise<GetAdsAdminResponseDTO> {
    const { skip, limit } = data;
    const ads = await this.adRepository.findAllAdsWithProvider(skip, limit);
    const count = await this.adRepository.getTotalAdCount();
    return { ads, count };
  }
}
