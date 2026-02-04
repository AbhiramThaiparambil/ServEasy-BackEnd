import { IAdStatus } from "../../../../dtos/admin/GetAdsAdminDTO";

export interface IChangeAdStatusUseCase {
  execute(id: string, status: IAdStatus): Promise<boolean>;
}
