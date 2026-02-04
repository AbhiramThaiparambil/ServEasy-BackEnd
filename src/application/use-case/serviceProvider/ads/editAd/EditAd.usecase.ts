import { injectable, inject } from "tsyringe";

import { IEditAdUseCase } from "./IEditAd.usecase";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IAdRepository } from "../../../../../domain/repositories/IAdRepository";
import { IAd } from "../../../../../domain/entities/IAd";

@injectable()
export class EditAdUseCase implements IEditAdUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.AdRepository) private adRepository: IAdRepository
  ) {}

  async execute(adId: string, data: Partial<IAd>): Promise<IAd | null> {
    return await this.adRepository.updateAd(adId, data);
  }
}
