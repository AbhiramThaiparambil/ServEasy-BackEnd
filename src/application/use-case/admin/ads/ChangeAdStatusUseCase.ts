import { inject, injectable } from "tsyringe";
import { IChangeAdStatusUseCase } from "./IChangeAdStatusUseCase";
import { IAdRepository } from "../../../../domain/repositories/IAdRepository";
import { REPOSITORY_TOKENS } from "../../../../utils/constants/tokens";
import { IAdStatus } from "../../../../utils/types/dto/IAdAdminDto";

@injectable()
export class ChangeAdStatusUseCase implements IChangeAdStatusUseCase {
  constructor(
    @inject(REPOSITORY_TOKENS.AdRepository) private adRepository: IAdRepository
  ) {}

  async execute(id: string, status: IAdStatus): Promise<boolean> {
    console.log('useCase')
    return await this.adRepository.changeAdStatus(id, status);
  }
}
