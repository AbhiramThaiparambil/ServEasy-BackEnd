import { injectable, inject } from "tsyringe";
import { IAd } from "../../../domain/entities/IAd";
import { IAdRepository } from "../../../domain/repositories/IAdRepository";
import { REPOSITORY_TOKENS } from "../../../utils/constants/tokens";
import { IEditAdUseCase } from "./IEditAdUseCase";

@injectable()
export class EditAdUseCase implements IEditAdUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.AdRepository) private adRepository: IAdRepository
  ) {}

  async execute(adId: string, data: Partial<IAd>): Promise<IAd | null> {
    return await this.adRepository.updateAd(adId, data);
  }
}
