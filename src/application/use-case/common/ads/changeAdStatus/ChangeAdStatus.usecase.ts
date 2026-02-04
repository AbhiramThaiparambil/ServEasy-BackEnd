import { inject, injectable } from "tsyringe";
import { IChangeAdStatusUseCase } from "./IChangeAdStatus.usecase";
import { IAdRepository } from "../../../../../domain/repositories/IAdRepository";
import { REPOSITORY_TOKENS } from "../../../../../constants/tokens";
import { IAdStatus } from "../../../../dtos/admin/GetAdsAdminDTO";

@injectable()
export class ChangeAdStatusUseCase implements IChangeAdStatusUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.AdRepository) private adRepository: IAdRepository
  ) {}

  async execute(id: string, status: IAdStatus): Promise<boolean> {
    console.log("useCase");
    return await this.adRepository.changeAdStatus(id, status);
  }
}
