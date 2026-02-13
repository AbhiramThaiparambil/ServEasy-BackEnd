import { IAdStatus } from "../../../admin/GetAdsAdminDTO";

export interface ChangeAdStatusRequestDTO {
  adId: string;
  status: IAdStatus;
}
