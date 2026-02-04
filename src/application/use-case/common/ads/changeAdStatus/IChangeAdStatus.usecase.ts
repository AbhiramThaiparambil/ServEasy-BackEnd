import { IAdStatus } from "../../../../../utils/types/dto/IAdAdminDto";

export interface IChangeAdStatusUseCase {
  execute(id: string, status: IAdStatus): Promise<boolean>;
}
