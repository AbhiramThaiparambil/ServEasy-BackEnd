import { inject, injectable } from "tsyringe";
import { IChangeAdStatusUseCase } from "../../common/ads/changeAdStatus/IChangeAdStatus.usecase";
import { IAdRepository } from "../../../../domain/repositories/IAdRepository";
import { REPOSITORY_TOKENS } from "../../../../constants/tokens";
import { ChangeAdStatusRequestDTO } from "../../../dtos/common/ads/changeAdStatus/ChangeAdStatusDTO";

@injectable()
export class ChangeAdStatusUseCase implements IChangeAdStatusUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.AdRepository) private adRepository: IAdRepository,
  ) {}

  async execute(data: ChangeAdStatusRequestDTO): Promise<boolean> {
    return await this.adRepository.changeAdStatus(data.adId, data.status);
  }
}
