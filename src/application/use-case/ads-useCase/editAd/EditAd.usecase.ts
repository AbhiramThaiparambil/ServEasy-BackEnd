import { injectable, inject } from "tsyringe";

import { IEditAdUseCase } from "./IEditAd.usecase";
import { IAdRepository } from "../../../../domain/repositories/IAdRepository";
import { IAd } from "../../../../domain/entities/IAd";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";

@injectable()
export class EditAdUseCase implements IEditAdUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.AdRepository) private adRepository: IAdRepository
  ) {}

  async execute(adId: string, data: Partial<IAd>): Promise<IAd | null> {
    return await this.adRepository.updateAd(adId, data);
  }
}
