import { inject, injectable } from "tsyringe";
import { IChangeAdStatusUseCase } from "./IChangeAdStatus.usecase";
import { IAdRepository } from "../../../../../domain/repositories/IAdRepository";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IAdStatus } from "../../../../dtos/admin/GetAdsAdminDTO";

import { ChangeAdStatusRequestDTO } from "../../../../../application/dtos/common/ads/changeAdStatus/ChangeAdStatusDTO";

@injectable()
export class ChangeAdStatusUseCase implements IChangeAdStatusUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.AdRepository) private adRepository: IAdRepository
  ) {}

  async execute(data: ChangeAdStatusRequestDTO): Promise<boolean> {
    const { adId, status } = data;
    console.log("useCase");
    return await this.adRepository.changeAdStatus(adId, status);
  }
}
