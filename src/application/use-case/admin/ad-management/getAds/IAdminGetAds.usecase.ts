import { GetAdsAdminDTO, GetAdsAdminResponseDTO } from "../../../../dtos/admin/GetAdsAdminDTO";

export interface IAdminGetAdsUseCase {
  execute(data: GetAdsAdminDTO): Promise<GetAdsAdminResponseDTO>;
}
