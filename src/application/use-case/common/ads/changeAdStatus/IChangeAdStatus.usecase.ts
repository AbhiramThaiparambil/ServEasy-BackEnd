import { ChangeAdStatusRequestDTO } from "../../../../../application/dtos/common/ads/changeAdStatus/ChangeAdStatusDTO";

export interface IChangeAdStatusUseCase {
  execute(data: ChangeAdStatusRequestDTO): Promise<boolean>;
}
