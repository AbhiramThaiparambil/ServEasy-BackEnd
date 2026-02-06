import { injectable, inject } from "tsyringe";

import { IEditAdUseCase } from "./IEditAd.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IAdRepository } from "../../../../../domain/repositories/IAdRepository";
import { IAd } from "../../../../../domain/entities/IAd";

import { EditAdRequestDTO } from "../../../../dtos/serviceProvider/ads/editAd/EditAdRequestDTO";

@injectable()
export class EditAdUseCase implements IEditAdUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.AdRepository) private adRepository: IAdRepository
  ) {}

  async execute(data: EditAdRequestDTO): Promise<IAd | null> {
    const { adId, updateData } = data;
    return await this.adRepository.updateAd(adId, updateData);
  }
}
